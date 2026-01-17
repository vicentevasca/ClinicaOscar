<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import galeria1 from "../../assets/img/galeria/galeria_1.png";
import galeria2 from "../../assets/img/galeria/galeria_2.png";
import galeria3 from "../../assets/img/galeria/galeria_3.png";
import galeria4 from "../../assets/img/galeria/galeria_4.png";
import galeria5 from "../../assets/img/galeria/galeria_5.png";

const posts = [
  { id: 1, image: galeria1, type: "Armonización Facial", link: "https://www.instagram.com/dr.oscarac/" },
  { id: 2, image: galeria2, type: "Rinomodelación", link: "https://www.instagram.com/dr.oscarac/" },
  { id: 3, image: galeria3, type: "Bioestimulación", link: "https://www.instagram.com/dr.oscarac/" },
  { id: 4, image: galeria4, type: "Full Face", link: "https://www.instagram.com/dr.oscarac/" },
  { id: 5, image: galeria5, type: "Pink Glow", link: "https://www.instagram.com/dr.oscarac/" },
];

// --- LÓGICA DE ANIMACIONES ---
const scrollContainer = ref(null);
const activeDesktopIndex = ref(-1); // Ninguno activo al inicio
let desktopInterval = null;
let mobileAnimationId = null;
let isUserInteracting = false;

// Configuración Móvil
let scrollDirection = 1; // 1 = derecha, -1 = izquierda
const scrollSpeed = 0.8; // Velocidad del desplazamiento (más bajo = más elegante)

// 1. Lógica Desktop: Auto-Hover Secuencial
const startDesktopAnimation = () => {
  let index = 0;
  activeDesktopIndex.value = 0;
  
  desktopInterval = setInterval(() => {
    if (isUserInteracting) return;
    // Avanzar al siguiente índice (0 -> 1 -> 2 -> 3 -> 0)
    index = (index + 1) % 4; // Solo animamos los primeros 4 que se ven en desktop
    activeDesktopIndex.value = index;
  }, 5000); // Cambio cada 2 segundos
};

// 2. Lógica Móvil: Scroll Vaivén (Ping-Pong)
const animateMobileScroll = () => {
  const container = scrollContainer.value;
  if (!container || isUserInteracting) return;

  // Detectar límites
  const maxScroll = container.scrollWidth - container.clientWidth;
  
  // Cambiar dirección si tocamos los bordes
  if (container.scrollLeft >= maxScroll - 1) scrollDirection = -1;
  if (container.scrollLeft <= 0) scrollDirection = 1;

  // Aplicar movimiento
  container.scrollLeft += scrollSpeed * scrollDirection;

  // Bucle de animación
  mobileAnimationId = requestAnimationFrame(animateMobileScroll);
};

// 3. Manejo de Interacción (Detener todo)
const stopAllAnimations = () => {
  isUserInteracting = true;
  activeDesktopIndex.value = -1; // Quitar efecto hover
  
  if (desktopInterval) clearInterval(desktopInterval);
  if (mobileAnimationId) cancelAnimationFrame(mobileAnimationId);
};

onMounted(() => {
  // Detectar si es móvil o escritorio para iniciar la animación correcta
  if (window.innerWidth >= 768) {
    startDesktopAnimation();
  } else {
    // Pequeño delay para asegurar que el DOM cargó y el scrollWidth es correcto
    setTimeout(() => {
      animateMobileScroll();
    }, 1000);
  }
});

onUnmounted(() => {
  clearInterval(desktopInterval);
  cancelAnimationFrame(mobileAnimationId);
});
</script>

<template>
  <section class="py-16 md:py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
    
    <div class="absolute top-[-20%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-clinic-gold/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

    <div class="container mx-auto relative z-10">
      
      <div class="px-6 flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div class="max-w-2xl w-full">
          <span class="text-clinic-gold font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs mb-4 flex items-center gap-3">
            <span class="w-8 h-[1px] bg-clinic-gold shadow-[0_0_8px_#D4AF37]"></span> 
            Portafolio
          </span>
          
          <h2 class="text-3xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-lg mb-4 text-balance">
            El Arte de la <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Transformación</span>
          </h2>
          
          <p class="text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-lg">
            Resultados naturales que respetan tu esencia. Síguenos en Instagram para ver casos diarios.
          </p>
        </div>

        <a
          href="https://www.instagram.com/dr.oscarac/"
          target="_blank"
          class="hidden md:flex group items-center gap-4 px-8 py-4 border border-white/20 rounded-sm hover:bg-clinic-gold hover:border-clinic-gold transition-all duration-500"
          @mouseenter="stopAllAnimations" 
        >
          <span class="text-white font-bold tracking-widest text-[11px] uppercase group-hover:text-black transition-colors">
            Ver Instagram
          </span>
          <div class="w-5 h-5 flex items-center justify-center group-hover:text-black text-white transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </div>
        </a>
      </div>

      <div 
        ref="scrollContainer"
        @mouseenter="stopAllAnimations"
        @touchstart="stopAllAnimations"
        class="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible gap-4 md:gap-[1px] px-6 md:px-0 pb-8 md:pb-0 scroll-smooth no-scrollbar"
      >
        
        <div
          v-for="(post, index) in posts.slice(0, 4)"
          :key="post.id"
          @click="stopAllAnimations"
          class="relative flex-shrink-0 w-[85vw] md:w-auto snap-center group aspect-[4/5] overflow-hidden bg-[#0a0a0a] cursor-pointer border border-white/10 md:border-none rounded-sm md:rounded-none transition-all duration-700"
        >
          <img
            :src="post.image"
            :alt="post.type"
            class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100 group-hover:scale-110"
            :class="{ 'scale-110 opacity-100': activeDesktopIndex === index }"
            loading="lazy"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent md:opacity-0 transition-all duration-700 flex flex-col justify-end p-6 md:p-8"
            :class="{ 'md:opacity-100': activeDesktopIndex === index, 'group-hover:opacity-100': true }"
          >
            <div 
              class="transform transition-transform duration-700 delay-75 md:translate-y-4"
              :class="{ 'md:translate-y-0': activeDesktopIndex === index, 'group-hover:translate-y-0': true }"
            >
              <span class="block text-clinic-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                Caso {{ index + 1 }}
              </span>
              <h3 class="text-white font-serif text-xl md:text-2xl leading-tight mb-4 drop-shadow-md">
                {{ post.type }}
              </h3>
              
              <a
                :href="post.link"
                target="_blank"
                class="inline-flex items-center text-[10px] uppercase tracking-widest text-white border-b border-white/30 hover:border-clinic-gold pb-1 transition-all"
              >
                Ver resultado <span class="ml-2 text-clinic-gold">→</span>
              </a>
            </div>
          </div>
        </div>

        <div class="md:hidden flex-shrink-0 w-[50vw] snap-center flex flex-col items-center justify-center bg-[#111] border border-white/5">
            <a :href="posts[0].link" target="_blank" class="flex flex-col items-center gap-4 p-4 text-center w-full h-full justify-center" @click="stopAllAnimations">
                <div class="w-12 h-12 rounded-full border border-clinic-gold flex items-center justify-center text-clinic-gold animate-pulse">
                    <span class="text-xl">+</span>
                </div>
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Ver Todo</span>
            </a>
        </div>

      </div>

      <div class="px-6 mt-4 md:mt-12 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-6 md:pt-8">
        
        <div class="md:hidden flex items-center gap-2 text-gray-500 mb-4 transition-opacity duration-500" :class="{ 'opacity-0': isUserInteracting }">
             <svg class="w-4 h-4 animate-bounce-horizontal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
             </svg>
             <span class="text-[9px] uppercase tracking-widest">Desliza para explorar</span>
        </div>

        <p class="text-[9px] md:text-[10px] text-gray-600 font-medium tracking-wide uppercase text-center md:text-left max-w-md">
          * Los resultados pueden variar según la fisiología de cada paciente.
        </p>

        <a
          href="https://www.instagram.com/dr.oscarac/"
          target="_blank"
          class="md:hidden w-full mt-6 py-4 bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs uppercase text-center rounded-sm hover:bg-clinic-gold hover:text-black transition-all"
          @click="stopAllAnimations"
        >
          Seguir en Instagram
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

img {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.text-balance {
  text-wrap: balance;
}

@keyframes bounceHorizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.animate-bounce-horizontal {
  animation: bounceHorizontal 1.5s infinite;
}
</style>