<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase'; // Importamos la app inicializada

// --- ESTADOS DEL WIZARD ---
const step = ref(1);
const loadingText = ref("Iniciando análisis biométrico..."); // Texto dinámico de carga

// --- ESTADO DEL SLIDER (ANTES/DESPUÉS) ---
const sliderPosition = ref(50);
const isDragging = ref(false);
const containerRef = ref(null);

// --- DATOS DEL USUARIO ---
const userProfile = reactive({
  gender: '', 
  ageRange: '',
  zone: '',
  zoneLabel: '',
  intensity: '' 
});

// --- BASE DE DATOS DE TRATAMIENTOS EXTENDIDA ---
// Agregamos: recuperación, nivel de dolor y duración del efecto.
const treatmentsDB = {
  ojos: {
    title: "Rejuvenecimiento de Mirada",
    treatment: "Relleno de Ojeras / Botox",
    desc: "Suaviza expresiones, elimina el cansancio y abre la mirada sin perder tu esencia.",
    imgBefore: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&grayscale", 
    imgAfter: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    recovery: "Inmediata",
    pain: "Mínimo",
    duration: "6 - 12 meses"
  },
  nariz: {
    title: "Rinomodelación Estética",
    treatment: "Rinomodelación Hialurónica",
    desc: "Corrección del perfil nasal, rectificación del dorso y elevación de la punta sin cirugía.",
    imgBefore: "https://images.unsplash.com/photo-1606103920295-97f88c0ce697?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1606103920295-97f88c0ce697?auto=format&fit=crop&q=80&w=800",
    recovery: "24-48 horas",
    pain: "Leve",
    duration: "12 - 18 meses"
  },
  labios: {
    title: "Diseño Labial & Armonización",
    treatment: "Lip Fillers / Hydralips",
    desc: "Diseño de labios respetando tu anatomía: volumen, hidratación y definición del arco de cupido.",
    imgBefore: "https://images.unsplash.com/photo-1588510701254-2280d924151a?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1588510701254-2280d924151a?auto=format&fit=crop&q=80&w=800",
    recovery: "3-5 días (inflamación)",
    pain: "Leve (Anestesia)",
    duration: "8 - 12 meses"
  },
  mandibula: {
    title: "Definición del Óvalo Facial",
    treatment: "Marcación Mandibular",
    desc: "Proyección de ángulos para un rostro con mayor carácter, estructura y efecto lifting.",
    imgBefore: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=800",
    recovery: "Inmediata",
    pain: "Leve",
    duration: "12 - 18 meses"
  },
  papada: {
    title: "Perfilado Cervical",
    treatment: "Lipo Enzimática",
    desc: "Eliminación de grasa submentoniana localizada para limpiar el perfil y estilizar el cuello.",
    imgBefore: "https://images.unsplash.com/photo-1552699616-8c92b2349e5d?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1552699616-8c92b2349e5d?auto=format&fit=crop&q=80&w=800",
    recovery: "3-7 días",
    pain: "Moderado",
    duration: "Permanente (con peso estable)"
  },
  piel: {
    title: "Glow & Calidad de Piel",
    treatment: "Bioestimuladores / Pink Glow",
    desc: "Tratamiento integral para devolver la luminosidad, uniformidad y textura de porcelana.",
    imgBefore: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=800",
    recovery: "24 horas",
    pain: "Mínimo",
    duration: "12 meses"
  }
};

const recommendation = computed(() => {
  if (!userProfile.zone) return null;
  return treatmentsDB[userProfile.zone];
});

// --- LÓGICA DE ENVÍO AL DASHBOARD ---
const sendDiagnosisToManager = async () => {
  try {
    const functions = getFunctions(app);
    const submitLead = httpsCallable(functions, 'submitLead');
    
    // Obtenemos todos los datos para alimentar el dashboard
    const treatmentInfo = recommendation.value || {};
    const treatmentName = treatmentInfo.treatment || 'General';

    // "Fire and Forget": Enviamos pero no bloqueamos si falla
    submitLead({
      type: 'diagnosis',
      payload: {
        gender: userProfile.gender,
        ageRange: userProfile.ageRange,
        zoneLabel: userProfile.zoneLabel,
        intensity: userProfile.intensity,
        treatmentRecommended: treatmentName,
        // Datos extra para analítica futura
        estimatedRecovery: treatmentInfo.recovery || 'N/A',
        estimatedDuration: treatmentInfo.duration || 'N/A'
      }
    }).catch(err => console.warn("Error background sync:", err));

    console.log("Enviando lead de diagnóstico...");
  } catch (e) {
    console.warn("Error conexión funciones:", e);
  }
};

// --- SIMULACIÓN DE ANÁLISIS IA ---
const runAnalysisSimulation = () => {
  step.value = 4; // Pantalla de carga
  
  const messages = [
    "Escaneando simetría facial...",
    "Analizando proporciones...",
    "Calculando proyección ideal...",
    "Buscando tratamiento óptimo...",
    "Generando visualización..."
  ];

  let i = 0;
  // Cambia el texto cada 600ms
  const interval = setInterval(() => {
    loadingText.value = messages[i];
    i++;
    if (i >= messages.length) clearInterval(interval);
  }, 600);

  // Termina después de 3.5 segundos
  setTimeout(() => {
    step.value = 5; // Resultado
    
    // Animación automática del slider (Demo)
    setTimeout(() => {
        let direction = 1;
        let pos = 50;
        const sliderAnim = setInterval(() => {
            if (isDragging.value) { clearInterval(sliderAnim); return; }
            pos += direction;
            if (pos > 65 || pos < 35) direction *= -1;
            sliderPosition.value = pos;
        }, 20);
        setTimeout(() => { clearInterval(sliderAnim); sliderPosition.value = 50; }, 1200);
    }, 800);

  }, 3500);
};

// --- LÓGICA DEL SLIDER ---
const handleMove = (event) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  let pos = ((clientX - rect.left) / rect.width) * 100;
  sliderPosition.value = Math.max(0, Math.min(100, pos));
};
const startDrag = () => { isDragging.value = true; };
const stopDrag = () => { isDragging.value = false; };

// --- NAVEGACIÓN ---
const selectGender = (g) => userProfile.gender = g;
const selectAge = (a) => userProfile.ageRange = a;
const nextStep = () => { if (step.value === 1 && (!userProfile.gender || !userProfile.ageRange)) return; step.value++; };
const selectZone = (key, label) => { userProfile.zone = key; userProfile.zoneLabel = label; step.value = 3; };

const selectIntensity = (level) => {
  userProfile.intensity = level;
  sendDiagnosisToManager(); // Guardar en BD
  runAnalysisSimulation();  // Iniciar show de carga
};

const reset = () => {
  step.value = 1;
  userProfile.gender = '';
  userProfile.ageRange = '';
  userProfile.zone = '';
  userProfile.intensity = '';
  sliderPosition.value = 50;
};

// --- WHATSAPP GENERATOR ---
const whatsappLink = computed(() => {
  if (!recommendation.value) return '#';
  
  const text = `Hola Dr. Arellano, mi diagnóstico IA dice que necesito *${recommendation.value.treatment}* en la zona de *${userProfile.zoneLabel}*.
  
📋 *Mi Perfil:*
• Edad: ${userProfile.ageRange}
• Objetivo: ${userProfile.intensity}
  
Me gustaría agendar una evaluación para confirmar si este tratamiento es para mí.`;

  return `https://wa.me/56912345678?text=${encodeURIComponent(text)}`;
});
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white pt-24 px-4 pb-12 selection:bg-clinic-gold selection:text-black">
    <div class="max-w-4xl mx-auto">
      
      <div class="text-center mb-10 animate-fade-in-up">
        <h2 class="text-3xl md:text-5xl font-serif italic text-clinic-gold mb-3">Diagnóstico Facial IA</h2>
        <p class="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
          Nuestra inteligencia artificial analiza tus objetivos para recomendarte el protocolo estético ideal.
        </p>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md relative overflow-hidden min-h-[500px] flex flex-col justify-center">
        
        <Transition name="slide-fade" mode="out-in">
          <div v-if="step === 1" key="step1" class="w-full">
            <h3 class="text-2xl font-bold text-center mb-8">Cuéntanos sobre ti</h3>
            
            <div class="space-y-8">
              <div>
                <p class="text-sm text-clinic-gold uppercase tracking-widest font-bold mb-4 text-center">Género</p>
                <div class="flex justify-center gap-4">
                  <button v-for="g in ['Mujer', 'Hombre', 'No-Binario']" :key="g"
                    @click="selectGender(g)"
                    class="px-6 py-3 rounded-full border transition-all duration-300 min-w-[100px]"
                    :class="userProfile.gender === g ? 'bg-clinic-gold text-black border-clinic-gold font-bold scale-105' : 'border-white/20 text-gray-400 hover:border-white hover:text-white'">
                    {{ g }}
                  </button>
                </div>
              </div>

              <div v-if="userProfile.gender" class="animate-fade-in">
                <p class="text-sm text-clinic-gold uppercase tracking-widest font-bold mb-4 text-center">Rango de Edad</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button v-for="a in ['18-25', '26-35', '36-45', '46+']" :key="a"
                    @click="selectAge(a)"
                    class="p-3 rounded-xl border transition-all duration-300"
                    :class="userProfile.ageRange === a ? 'bg-white/10 border-clinic-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-black/20 border-white/10 text-gray-500 hover:border-white/50'">
                    {{ a }} años
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-10 text-center">
              <button @click="nextStep" 
                :disabled="!userProfile.gender || !userProfile.ageRange"
                class="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-clinic-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                Siguiente
              </button>
            </div>
          </div>

          <div v-else-if="step === 2" key="step2" class="w-full">
            <h3 class="text-2xl font-bold text-center mb-2">¿Qué zona te gustaría mejorar?</h3>
            <p class="text-center text-gray-500 mb-8 text-sm">Selecciona el área prioritaria para el análisis.</p>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button @click="selectZone('ojos', 'Mirada / Ojeras')" class="zone-btn group">
                <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">👁️</span>
                <span class="text-sm font-medium">Mirada</span>
              </button>
              <button @click="selectZone('nariz', 'Nariz / Perfil')" class="zone-btn group">
                <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">👃</span>
                <span class="text-sm font-medium">Nariz</span>
              </button>
              <button @click="selectZone('labios', 'Labios')" class="zone-btn group">
                <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">💋</span>
                <span class="text-sm font-medium">Labios</span>
              </button>
              <button @click="selectZone('mandibula', 'Mandíbula / Mentón')" class="zone-btn group">
                <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">📐</span>
                <span class="text-sm font-medium">Mandíbula</span>
              </button>
              <button @click="selectZone('papada', 'Cuello / Papada')" class="zone-btn group">
                <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">🦢</span>
                <span class="text-sm font-medium">Papada</span>
              </button>
              <button @click="selectZone('piel', 'Calidad de Piel')" class="zone-btn group">
                <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">✨</span>
                <span class="text-sm font-medium">Piel / Glow</span>
              </button>
            </div>
          </div>

          <div v-else-if="step === 3" key="step3" class="w-full">
            <h3 class="text-2xl font-bold text-center mb-8">¿Qué resultado buscas?</h3>
            
            <div class="space-y-4 max-w-md mx-auto">
              <button @click="selectIntensity('Natural')" class="intensity-btn group">
                <div class="intensity-icon">🍃</div>
                <div>
                  <h4 class="font-bold text-white group-hover:text-clinic-gold transition-colors">Mejora Sutil</h4>
                  <p class="text-xs text-gray-400">"Que me vean mejor pero no sepan qué me hice"</p>
                </div>
              </button>

              <button @click="selectIntensity('Balanceada')" class="intensity-btn group">
                <div class="intensity-icon">⚖️</div>
                <div>
                  <h4 class="font-bold text-white group-hover:text-clinic-gold transition-colors">Armonización</h4>
                  <p class="text-xs text-gray-400">Equilibrio facial y corrección de asimetrías visibles</p>
                </div>
              </button>

              <button @click="selectIntensity('Transformación')" class="intensity-btn group">
                <div class="intensity-icon">💎</div>
                <div>
                  <h4 class="font-bold text-white group-hover:text-clinic-gold transition-colors">Cambio Definido</h4>
                  <p class="text-xs text-gray-400">Resultados notorios, perfilado y estructura marcada</p>
                </div>
              </button>
            </div>
          </div>

          <div v-else-if="step === 4" key="step4" class="w-full text-center">
            <div class="relative w-24 h-24 mx-auto mb-6">
              <div class="absolute inset-0 border-4 border-white/10 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-t-clinic-gold rounded-full animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">🤖</div>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">IA trabajando</h3>
            <p class="text-clinic-gold font-mono text-sm tracking-widest">{{ loadingText }}</p>
          </div>

          <div v-else-if="step === 5" key="step5" class="w-full">
            <div class="text-center mb-6">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-1">Tratamiento Recomendado</p>
              <h2 class="text-2xl md:text-3xl font-serif italic text-clinic-gold">{{ recommendation.title }}</h2>
              <p class="text-white font-bold text-lg mt-2">{{ recommendation.treatment }}</p>
            </div>

            <div class="grid grid-cols-3 gap-2 mb-6 text-center">
                <div class="bg-white/5 p-2 rounded-lg border border-white/5">
                    <span class="block text-[10px] text-gray-400 uppercase">Recuperación</span>
                    <span class="text-xs font-bold text-white">{{ recommendation.recovery }}</span>
                </div>
                <div class="bg-white/5 p-2 rounded-lg border border-white/5">
                    <span class="block text-[10px] text-gray-400 uppercase">Dolor</span>
                    <span class="text-xs font-bold text-white">{{ recommendation.pain }}</span>
                </div>
                <div class="bg-white/5 p-2 rounded-lg border border-white/5">
                    <span class="block text-[10px] text-gray-400 uppercase">Duración</span>
                    <span class="text-xs font-bold text-white">{{ recommendation.duration }}</span>
                </div>
            </div>

            <div class="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10 group select-none touch-none"
                 ref="containerRef"
                 @mousedown="startDrag" @touchstart="startDrag"
                 @mouseup="stopDrag" @touchend="stopDrag"
                 @mouseleave="stopDrag"
                 @mousemove="handleMove" @touchmove="handleMove">
              
              <img :src="recommendation.imgBefore" class="absolute inset-0 w-full h-full object-cover grayscale" alt="Antes">
              <div class="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded text-xs font-bold text-white">ANTES</div>

              <div class="absolute inset-0 w-full h-full overflow-hidden" :style="{ width: sliderPosition + '%' }">
                <img :src="recommendation.imgAfter" class="absolute top-0 left-0 max-w-none h-full object-cover" 
                     :style="{ width: containerRef?.offsetWidth + 'px' }" alt="Después">
                <div class="absolute top-4 right-4 bg-clinic-gold/90 px-3 py-1 rounded text-xs font-bold text-black">DESPUÉS (Simulación)</div>
              </div>

              <div class="absolute top-0 bottom-0 w-1 bg-clinic-gold cursor-ew-resize shadow-[0_0_10px_rgba(212,175,55,0.8)] z-10"
                   :style="{ left: sliderPosition + '%' }">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-clinic-gold rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-black text-xs font-bold">↔</span>
                </div>
              </div>
            </div>

            <div class="bg-white/5 p-4 rounded-xl border-l-2 border-clinic-gold mb-8">
              <p class="text-sm text-gray-300 italic">"{{ recommendation.desc }}"</p>
            </div>

            <a :href="whatsappLink" target="_blank"
               class="block w-full bg-gradient-to-r from-clinic-gold to-yellow-600 text-black font-bold text-center py-4 rounded-full text-lg uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1">
               Agendar Evaluación
            </a>
            
            <button @click="reset" class="mt-6 text-gray-600 text-xs uppercase tracking-widest hover:text-white transition-colors w-full pb-4">Reiniciar Diagnóstico</button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.zone-btn {
  @apply flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-clinic-gold/50 transition-all duration-300 text-gray-300 hover:text-white;
}
.intensity-btn {
  @apply w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-clinic-gold/50 transition-all duration-300 text-left flex items-center gap-4;
}
.intensity-icon {
  @apply shrink-0 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-clinic-gold group-hover:text-black transition-colors;
}

/* Transiciones Suaves */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.4s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateY(10px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }

.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(30px); }
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }

@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>