const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configura la región si es necesario (usualmente us-central1 está bien)
setGlobalOptions({ region: "us-central1" });

// 1. CONFIGURACIÓN DEL TRANSPORTE DE CORREO
// Reemplaza con tus credenciales reales
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tu_correo_clinica@gmail.com", // Tu gmail
    pass: "xxxx xxxx xxxx xxxx", // TU APP PASSWORD (16 caracteres)
  },
});

// 2. FUNCIÓN UNIFICADA: RECIBE CONTACTO Y DIAGNÓSTICO
exports.submitLead = onCall(async (request) => {
  // En v2, los datos vienen en request.data
  const { type, payload } = request.data; 

  // Validaciones básicas
  if (!type || !payload) {
    throw new HttpsError("invalid-argument", "Faltan datos requeridos.");
  }

  // A) Guardar en Base de Datos (Firestore) para respaldo/CRM
  try {
    await admin.firestore().collection("leads").add({
      type, // 'contact' o 'diagnosis'
      ...payload,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "pendiente", 
    });
  } catch (error) {
    console.error("Error guardando en Firestore:", error);
    // Continuamos aunque falle la DB, lo prioritario es el correo
  }

  // B) Preparar el Correo HTML
  let mailOptions = {
    from: '"Clínica Dr. Arellano" <tu_correo_clinica@gmail.com>',
    to: "correo_gerente@clinica.com", // A quién le llega el aviso
  };

  if (type === "contact") {
    // CASO 1: FORMULARIO DE CONTACTO DIRECTO
    mailOptions.subject = `📩 Nuevo Mensaje Web: ${payload.name}`;
    mailOptions.html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #D4AF37;">Nuevo Contacto Recibido</h2>
        <p>Un cliente ha llenado el formulario de contacto:</p>
        <hr style="border: 1px solid #eee;">
        <ul style="list-style: none; padding: 0;">
          <li><strong>👤 Nombre:</strong> ${payload.name}</li>
          <li><strong>📧 Email:</strong> ${payload.email}</li>
          <li><strong>📱 Teléfono:</strong> ${payload.phone}</li>
          <li><strong>🏥 Servicio de interés:</strong> ${payload.service}</li>
        </ul>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
          <strong>Mensaje:</strong><br>
          ${payload.message}
        </div>
      </div>
    `;

  } else if (type === "diagnosis") {
    // CASO 2: DIAGNÓSTICO INTELIGENTE (InformationView)
    mailOptions.subject = `✨ Lead Calificado (IA): ${payload.gender} - ${payload.zoneLabel}`;
    mailOptions.html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #D4AF37;">Nuevo Lead desde Diagnóstico Virtual</h2>
        <p>Un cliente completó el wizard y mostró alta intención de compra.</p>
        
        <div style="background: #000; color: #fff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin: 0; color: #D4AF37;">${payload.treatmentRecommended}</h3>
          <small>Tratamiento Recomendado</small>
        </div>

        <h3>Perfil del Paciente:</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Identidad:</strong> ${payload.gender}</li>
          <li><strong>Rango Edad:</strong> ${payload.ageRange}</li>
          <li><strong>Zona:</strong> ${payload.zoneLabel}</li>
          <li><strong>Objetivo:</strong> ${payload.intensity}</li>
        </ul>

        <p style="background: #eaffea; padding: 10px; border: 1px solid #ccffcc; border-radius: 4px;">
          ℹ️ <strong>Acción Sugerida:</strong> Este cliente ya vio el tratamiento y precio estimado. Contactar para cerrar cita.
        </p>
      </div>
    `;
  }

  // C) Enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Correo enviado y lead guardado." };
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw new HttpsError("internal", "No se pudo enviar el correo de notificación.");
  }
});