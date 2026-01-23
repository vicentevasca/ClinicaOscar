<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// --- ESTADOS DEL WIZARD ---
const step = ref(1);
const isLoading = ref(false);

// --- ESTADO DEL SLIDER (ANTES/DESPUÉS) ---
const sliderPosition = ref(50); // 50% por defecto
const isDragging = ref(false);
const containerRef = ref(null);

// --- DATOS DEL USUARIO ---
const userProfile = reactive({
  gender: '', // 'mujer', 'hombre', 'no-binario'
  ageRange: '',
  zone: '',
  zoneLabel: '',
  intensity: '' 
});

// --- BASE DE DATOS OPTIMIZADA (Imágenes Placeholder) ---
// NOTA: Reemplaza las URL 'source.unsplash.com' por tus fotos reales optimizadas (formato WebP)
const treatmentsDB = {
  ojos: {
    title: "Rejuvenecimiento de Mirada",
    treatment: "Relleno Hialurónico / Botox",
    desc: "Suaviza expresiones y elimina el cansancio sin perder tu esencia. Ideal para miradas que buscan frescura.",
    // Fotos de ejemplo: Ojos cansados vs Ojos frescos
    imgBefore: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&grayscale", 
    imgAfter: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800", // En producción usa fotos reales distintas
    benefits: ["Mirada descansada", "Resultados naturales", "Hidratación"],
    recovery: "Inmediata",
    pain: "Mínimo",
  },
  nariz: {
    title: "Rinomodelación Estética",
    treatment: "Rinomodelación",
    desc: "Corrección del perfil nasal para armonizar tu rostro. Rectificación de dorso y elevación de punta.",
    imgBefore: "https://images.unsplash.com/photo-1606103920295-97f88c0ce697?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1606103920295-97f88c0ce697?auto=format&fit=crop&q=80&w=800",
    benefits: ["Perfil recto", "Punta elevada", "Sin cirugía"],
    recovery: "24-48 horas",
    pain: "Leve",
  },
  labios: {
    title: "Diseño Labial & Armonización",
    treatment: "Lip Fillers / Hydralips",
    desc: "Desde una hidratación sutil hasta volumen statement. Diseñamos tus labios respetando tu fisionomía.",
    imgBefore: "https://images.unsplash.com/photo-1588510701254-2280d924151a?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1588510701254-2280d924151a?auto=format&fit=crop&q=80&w=800",
    benefits: ["Simetría", "Volumen a medida", "Perfilado"],
    recovery: "3-5 días",
    pain: "Leve (Anestesia)",
  },
  mandibula: {
    title: "Definición del Óvalo Facial",
    treatment: "Marcación Mandibular",
    desc: "Proyección y definición de ángulos para un rostro con mayor carácter y estructura.",
    imgBefore: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=800",
    benefits: ["Rostro definido", "Efecto lifting", "Masculinización/Feminización"],
    recovery: "Inmediata",
    pain: "Leve",
  },
  papada: {
    title: "Perfilado Cervical",
    treatment: "Enzimas (Mesolipopapada)",
    desc: "Eliminación de grasa submentoniana para limpiar el perfil y estilizar el cuello.",
    imgBefore: "https://images.unsplash.com/photo-1552699616-8c92b2349e5d?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1552699616-8c92b2349e5d?auto=format&fit=crop&q=80&w=800",
    benefits: ["Eliminación grasa", "Sin cirugía", "Cuello estilizado"],
    recovery: "3-7 días",
    pain: "Moderado",
  },
  piel: {
    title: "Glow & Calidad de Piel",
    treatment: "Bioestimuladores / Pink Glow",
    desc: "Tratamiento integral para devolver la luz, uniformidad y textura de porcelana a tu piel.",
    imgBefore: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=800&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=800",
    benefits: ["Piel radiante", "Cierre de poros", "Anti-aging"],
    recovery: "24 horas",
    pain: "Leve",
  }
};

const recommendation = computed(() => {
  if (!userProfile.zone) return null;
  return treatmentsDB[userProfile.zone];
});

// --- LÓGICA DEL SLIDER ---
const handleMove = (event) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  
  // Calcular porcentaje (0 a 100)
  let pos = ((clientX - rect.left) / rect.width) * 100;
  pos = Math.max(0, Math.min(100, pos)); // Limitar entre 0 y 100
  sliderPosition.value = pos;
};

const startDrag = () => { isDragging.value = true; };
const stopDrag = () => { isDragging.value = false; };

// --- GENERADOR WHATSAPP INCLUSIVO ---
const whatsappLink = computed(() => {
  if (!recommendation.value) return '#';
  
  let genderTerm = '';
  let contextTerm = '';

  if (userProfile.gender === 'mujer') {
    genderTerm = 'Mujer';
    contextTerm = 'Busco resaltar mis rasgos o feminizar.';
  } else if (userProfile.gender === 'hombre') {
    genderTerm = 'Hombre';
    contextTerm = 'Busco definir rasgos o masculinizar.';
  } else {
    genderTerm = 'No Binario / Otro';
    contextTerm = 'Busco armonización facial y equilibrio.';
  }

  const text = `Hola Dr. Arellano, hice el diagnóstico virtual.
  
🏳️‍🌈 *Perfil:*
• Identidad: ${genderTerm}, ${userProfile.ageRange} años.
• Zona: *${userProfile.zoneLabel}*
• Objetivo: *${userProfile.intensity}*
• Contexto: ${contextTerm}

Me interesa el tratamiento: ${recommendation.value.treatment}.`;

  return `https://wa.me/56912345678?text=${encodeURIComponent(text)}`;
});

const selectGender = (g) => userProfile.gender = g;
const selectAge = (a) => userProfile.ageRange = a;

const nextStep = () => {
  if (step.value === 1 && (!userProfile.gender || !userProfile.ageRange)) return;
  step.value++;
};

const selectZone = (key, label) => {
  userProfile.zone = key;
  userProfile.zoneLabel = label;
  step.value = 3;
};

const selectIntensity = (level) => {
  userProfile.intensity = level;
  isLoading.value = true;
  step.value = 4;
  
  // Simular carga y animación inicial del slider
  setTimeout(() => {
    isLoading.value = false;
    // Pequeña animación automática del slider para enseñar cómo funciona
    setTimeout(() => {
        let direction = 1;
        let pos = 50;
        const interval = setInterval(() => {
            if (isDragging.value) { clearInterval(interval); return; }
            pos += direction;
            if (pos > 60 || pos < 40) direction *= -1;
            sliderPosition.value = pos;
        }, 30);
        setTimeout(() => clearInterval(interval), 1500);
    }, 500);
  }, 1800);
};

const reset = () => {
  step.value = 1;
  userProfile.gender = '';
  userProfile.ageRange = '';
  userProfile.zone = '';
  userProfile.intensity = '';
  isLoading.value = false;
  sliderPosition.value = 50;
};
</script>

<template>
  <div class="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
    
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-clinic-gold/10 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full"></div> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
    </div>

    <div class="w-full max-w-2xl relative z-10">
      
      <div class="text-center mb-6 transition-all duration-500" :class="{ 'opacity-0 h-0 overflow-hidden mb-0': step === 4 && !isLoading }">
        <span class="text-clinic-gold font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block animate-fade-in">
          Diagnóstico & Inclusión
        </span>
        <h1 class="text-2xl md:text-4xl font-serif text-white font-bold mb-2">
          Tu Mejor Versión
        </h1>
        <p class="text-gray-400 text-xs md:text-sm font-light max-w-md mx-auto">
          Protocolos personalizados respetando tu identidad y rasgos únicos.
        </p>
      </div>

      <div class="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500 min-h-[400px] flex flex-col justify-center" :class="step === 4 && !isLoading ? 'border-clinic-gold/40' : ''">
        
        <div class="absolute top-0 left-0 h-1 bg-clinic-gold transition-all duration-700 ease-out z-20" :style="{ width: `${(step / 4) * 100}%` }"></div>

        <Transition name="slide-fade" mode="out-in">
          
          <div v-if="step === 1" key="step1" class="w-full">
            <div class="mb-6">
              <label class="block text-white text-xs md:text-sm font-bold uppercase tracking-widest mb-4">1. ¿Cuál es tu identidad?</label>
              <div class="grid grid-cols-3 gap-3">
                <button 
                  v-for="g in [
                    {key: 'mujer', icon: '👩', label: 'Mujer'},
                    {key: 'hombre', icon: '👨', label: 'Hombre'},
                    {key: 'no-binario', icon: '🌈', label: 'No Binario'}
                  ]"
                  :key="g.key"
                  @click="selectGender(g.key)"
                  :class="userProfile.gender === g.key ? 'bg-clinic-gold text-black border-clinic-gold' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'"
                  class="p-3 md:p-4 border rounded-xl transition-all duration-300 font-bold flex flex-col items-center gap-2 group"
                >
                  <span class="text-2xl filter group-hover:brightness-125">{{ g.icon }}</span>
                  <span class="text-[10px] md:text-xs uppercase tracking-wide">{{ g.label }}</span>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-white text-xs md:text-sm font-bold uppercase tracking-widest mb-4">2. Edad</label>
              <div class="grid grid-cols-4 gap-2">
                <button v-for="age in ['18-25', '26-35', '36-50', '50+']" :key="age"
                  @click="selectAge(age)"
                  :class="userProfile.ageRange === age ? 'bg-white text-black scale-105' : 'bg-white/5 text-gray-400 hover:bg-white/10'"
                  class="py-3 rounded-lg text-xs font-bold transition-all border border-transparent"
                >
                  {{ age }}
                </button>
              </div>
            </div>

            <button 
              @click="nextStep"
              :disabled="!userProfile.gender || !userProfile.ageRange"
              class="w-full mt-8 py-4 bg-gradient-to-r from-clinic-gold to-[#fcf6ba] text-black font-bold uppercase tracking-widest rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
            >
              Continuar
            </button>
          </div>

          <div v-else-if="step === 2" key="step2" class="w-full">
            <label class="block text-white text-sm font-bold uppercase tracking-widest mb-6 text-center">3. ¿Qué deseas potenciar?</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button @click="selectZone('ojos', 'Ojeras / Mirada')" class="zone-btn group"><span class="text-2xl mb-1">👁️</span><span class="text-xs">Mirada</span></button>
              <button @click="selectZone('nariz', 'Nariz')" class="zone-btn group"><span class="text-2xl mb-1">👃</span><span class="text-xs">Nariz</span></button>
              <button @click="selectZone('labios', 'Labios')" class="zone-btn group"><span class="text-2xl mb-1">👄</span><span class="text-xs">Labios</span></button>
              <button @click="selectZone('mandibula', 'Mandíbula')" class="zone-btn group"><span class="text-2xl mb-1">📐</span><span class="text-xs">Mandíbula</span></button>
              <button @click="selectZone('papada', 'Cuello/Papada')" class="zone-btn group"><span class="text-2xl mb-1">🧣</span><span class="text-xs">Cuello</span></button>
              <button @click="selectZone('piel', 'Piel')" class="zone-btn group"><span class="text-2xl mb-1">✨</span><span class="text-xs">Piel</span></button>
            </div>
            <button @click="step = 1" class="mt-6 text-gray-500 text-[10px] uppercase tracking-widest hover:text-white w-full text-center">← Volver</button>
          </div>

          <div v-else-if="step === 3" key="step3" class="w-full">
            <label class="block text-white text-sm font-bold uppercase tracking-widest mb-6 text-center">4. ¿Cuál es tu objetivo?</label>
            <div class="space-y-4">
              <button @click="selectIntensity('Natural y Sutil')" class="intensity-btn group">
                <div class="intensity-icon">🍃</div>
                <div><span class="block text-white font-bold">Natural</span><span class="text-gray-400 text-xs">Mejorar sin cambiar mi esencia.</span></div>
              </button>
              <button @click="selectIntensity('Transformación / Glow Up')" class="intensity-btn group">
                <div class="intensity-icon">💎</div>
                <div><span class="block text-white font-bold">Glow Up / Armonización</span><span class="text-gray-400 text-xs">Definición, proyección y cambio visible.</span></div>
              </button>
            </div>
            <button @click="step = 2" class="mt-6 text-gray-500 text-[10px] uppercase tracking-widest hover:text-white w-full text-center">← Volver</button>
          </div>

          <div v-else-if="isLoading" key="loading" class="text-center w-full">
             <div class="w-12 h-12 border-t-2 border-clinic-gold rounded-full animate-spin mx-auto mb-4"></div>
             <p class="text-gray-400 text-xs animate-pulse">Analizando facciones...</p>
          </div>

          <div v-else-if="step === 4 && !isLoading" key="result" class="w-full">
            
            <div class="flex justify-between items-end mb-4 animate-fade-in-up">
              <div>
                <span class="text-clinic-gold text-[10px] font-bold uppercase tracking-widest">Recomendación</span>
                <h2 class="text-xl md:text-2xl font-serif text-white font-bold leading-none mt-1">{{ recommendation.title }}</h2>
              </div>
              <div class="text-right hidden md:block">
                 <span class="text-[9px] text-gray-500 uppercase tracking-widest">Protocolo</span>
                 <p class="text-white text-xs font-bold">{{ recommendation.treatment }}</p>
              </div>
            </div>

            <div 
              ref="containerRef"
              class="relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden cursor-ew-resize touch-none shadow-2xl mb-6 group select-none animate-fade-in-up delay-100 border border-white/10"
              @mousedown="startDrag"
              @touchstart="startDrag"
              @mousemove="isDragging && handleMove($event)"
              @touchmove="isDragging && handleMove($event)"
              @mouseup="stopDrag"
              @touchend="stopDrag"
              @mouseleave="stopDrag"
            >
                <img :src="recommendation.imgAfter" class="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="lazy" alt="Después" />
                <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-widest z-10 pointer-events-none">Después</div>

                <div 
                  class="absolute inset-0 h-full overflow-hidden pointer-events-none will-change-[width]"
                  :style="{ width: `${sliderPosition}%` }"
                >
                    <img :src="recommendation.imgBefore" class="absolute top-0 left-0 h-full max-w-none w-[100%] md:w-[600px] object-cover" :style="{ width: containerRef?.offsetWidth + 'px' }" alt="Antes" />
                    <div class="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-widest z-10">Antes</div>
                </div>

                <div 
                  class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center will-change-[left]"
                  :style="{ left: `${sliderPosition}%` }"
                >
                    <div class="w-8 h-8 bg-clinic-gold rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                        <svg class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" /></svg>
                    </div>
                </div>
            </div>

            <div class="bg-white/5 rounded-xl p-4 mb-6 text-left border-l-2 border-clinic-gold animate-fade-in-up delay-200">
              <p class="text-gray-300 text-xs md:text-sm leading-relaxed mb-3">{{ recommendation.desc }}</p>
              <div class="flex gap-4 text-[10px] uppercase tracking-widest text-gray-500">
                <span>Recuperación: <b class="text-white">{{ recommendation.recovery }}</b></span>
                <span>Dolor: <b class="text-white">{{ recommendation.pain }}</b></span>
              </div>
            </div>

            <a :href="whatsappLink" target="_blank" class="block w-full py-4 bg-[#25D366] hover:bg-[#1fa855] text-white font-bold uppercase tracking-widest rounded-lg shadow-lg flex items-center justify-center gap-2 animate-fade-in-up delay-300 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Confirmar Interés
            </a>
            
            <button @click="reset" class="mt-6 text-gray-600 text-[10px] uppercase tracking-widest hover:text-white transition-colors w-full">Reiniciar</button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.zone-btn {
  @apply flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-clinic-gold/50 transition-all duration-300 text-gray-300 hover:text-white;
}
.intensity-btn {
  @apply w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-clinic-gold/50 transition-all duration-300 text-left flex items-center gap-4;
}
.intensity-icon {
  @apply shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg group-hover:bg-clinic-gold group-hover:text-black transition-colors;
}

/* Transiciones */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateX(10px); }
.slide-fade-leave-to { opacity: 0; transform: translateX(-10px); }

.animate-fade-in-up { opacity: 0; animation: fadeInUp 0.6s ease-out forwards; }
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>