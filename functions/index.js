const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configura la región (us-central1 es la estándar y más barata)
setGlobalOptions({ region: "us-central1" });

// ==========================================
// 1. CONFIGURACIÓN DEL CORREO (CRÍTICO)
// ==========================================
// Necesitas generar una "Contraseña de Aplicación" en Google.
// No uses tu contraseña normal.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vice.vasca@gmail.com", // <--- PON AQUÍ EL GMAIL QUE ENVIARÁ LOS CORREOS
    pass: "hsmq disd nebg hyga", // <--- PON AQUÍ TU APP PASSWORD (16 caracteres sin espacios)
  },
});

// 1. FUNCIÓN GUARDAR LEAD (La que ya tenías)
exports.submitLead = onCall({ cors: true }, async (request) => {
  const { type, payload } = request.data;
  
  // Guardar en Firestore
  try {
    await admin.firestore().collection("leads").add({
      type,
      data: payload,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "nuevo",
    });
  } catch (error) {
    throw new HttpsError("internal", "Error guardando en BD");
  }

  // Enviar correo solo si es CONTACTO
  if (type === "contact") {
    const mailOptions = {
      from: '"Web Clínica" <tucorreo@gmail.com>',
      to: "gerente@clinica.com", // <--- CORREO DEL GERENTE
      subject: `📩 Nuevo Mensaje: ${payload.name}`,
      html: `
        <h2>Nuevo Contacto Web</h2>
        <p><strong>Nombre:</strong> ${payload.name}</p>
        <p><strong>Tel:</strong> <a href="tel:${payload.phone}">${payload.phone}</a></p>
        <p><strong>Mensaje:</strong> ${payload.message}</p>
      `
    };
    try { await transporter.sendMail(mailOptions); } catch(e) { console.error(e); }
  }
  return { success: true };
});

// 2. NUEVA FUNCIÓN: GENERAR Y ENVIAR REPORTE (Para el botón)
exports.sendReport = onCall({ cors: true }, async (request) => {
  const { period, emailTarget } = request.data; // period: 'weekly' o 'monthly'

  if (!emailTarget) throw new HttpsError("invalid-argument", "Falta el email de destino");

  // A) Calcular rango de fechas
  const now = new Date();
  const startDate = new Date();
  if (period === 'monthly') {
    startDate.setMonth(now.getMonth() - 1);
  } else {
    startDate.setDate(now.getDate() - 7); // Default: Semanal
  }

  // B) Buscar Leads en Firestore
  const leadsSnapshot = await admin.firestore().collection("leads")
    .where("createdAt", ">=", startDate)
    .orderBy("createdAt", "desc")
    .get();

  const leads = leadsSnapshot.docs.map(doc => {
    const d = doc.data();
    return {
      date: d.createdAt.toDate().toLocaleDateString("es-CL"),
      type: d.type === 'contact' ? 'Contacto' : 'Diagnóstico',
      name: d.data.name || (d.data.gender + ' ' + d.data.ageRange),
      phone: d.data.phone || 'N/A',
      detail: d.type === 'contact' ? d.data.service : d.data.treatmentRecommended,
      status: d.status
    };
  });

  // C) Generar CSV (Excel simple)
  let csvContent = "Fecha,Tipo,Nombre,Telefono,Detalle,Estado\n";
  leads.forEach(l => {
    csvContent += `${l.date},${l.type},"${l.name}",${l.phone},"${l.detail}",${l.status}\n`;
  });

  // D) Enviar Correo con Adjunto
  const mailOptions = {
    from: '"Reportes Clínica" <tucorreo@gmail.com>',
    to: emailTarget,
    subject: `📊 Reporte ${period === 'monthly' ? 'Mensual' : 'Semanal'} de Leads`,
    html: `
      <div style="font-family: Arial;">
        <h2 style="color: #D4AF37;">Resumen de Actividad</h2>
        <p>Aquí tienes el reporte de los últimos <strong>${leads.length}</strong> clientes potenciales registrados.</p>
        <ul>
          <li>Periodo: ${startDate.toLocaleDateString()} - ${now.toLocaleDateString()}</li>
          <li>Total Leads: ${leads.length}</li>
        </ul>
        <p>Descarga el archivo adjunto para ver el detalle en Excel.</p>
      </div>
    `,
    attachments: [
      {
        filename: `reporte_${period}_${now.toISOString().split('T')[0]}.csv`,
        content: csvContent
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, count: leads.length };
  } catch (error) {
    console.error("Error reporte:", error);
    throw new HttpsError("internal", "No se pudo enviar el reporte");
  }
});