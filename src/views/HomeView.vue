<script setup>
import { RouterLink } from "vue-router";
import content from "../data/content.json";
import ServiceCard from "../components/UI/ServiceCard.vue";
import InstagramGallery from "../components/UI/InstagramGallery.vue";

// Importación de imágenes
import oscarHero from "../assets/img/oscar_hero.png";
import heroBackground from "../assets/img/hero_background.avif";
</script>

<template>
  <div class="bg-[#050505] min-h-screen selection:bg-clinic-gold selection:text-black overflow-x-hidden">
    
    <section class="relative min-h-[100dvh] flex items-center overflow-hidden">
      
      <div class="absolute inset-0 z-0">
        <img
          :src="heroBackground"
          alt="Clínica Estética Background"
          class="w-full h-full object-cover object-center opacity-40 scale-105 animate-slow-zoom grayscale-[100%]"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/30"></div>
        <div class="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
      </div>

      <div class="absolute bottom-0 right-[-15%] md:right-0 z-10 w-full h-[60%] md:h-full flex justify-end items-end pointer-events-none">
        <div class="relative w-[85%] md:w-[55%] lg:w-[45%] max-w-[800px] animate-luxury-entrance">
          <div class="absolute inset-0 bg-clinic-gold/10 blur-[80px] md:blur-[120px] rounded-full transform translate-y-20"></div>

          <img
            :src="oscarHero"
            alt="Dr. Oscar Arellano"
            class="relative z-20 w-full h-auto object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] mask-image-gradient"
          />
        </div>
      </div>

      <div class="container mx-auto px-6 relative z-30 pt-20 md:pt-0">
        <div class="max-w-xl md:max-w-2xl animate-slide-up">
          
          <div class="overflow-hidden mb-6 md:mb-8">
            <span class="inline-flex items-center gap-3 text-clinic-gold font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs animate-reveal border border-clinic-gold/20 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
              <span class="w-2 h-2 rounded-full bg-clinic-gold shadow-[0_0_10px_#D4AF37] animate-pulse"></span>
              Excelencia en Armonización
            </span>
          </div>

          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 md:mb-8 balance drop-shadow-2xl">
            {{ content.hero.title }}
          </h1>

          <p class="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-md md:max-w-lg mb-10 md:mb-12 border-l-2 border-clinic-gold/50 pl-6 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-[2px] rounded-r-lg py-4 md:bg-none md:backdrop-blur-0 md:p-0 md:border-l-0">
            {{ content.hero.subtitle }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start w-full sm:w-auto">
            <a
              :href="content.contact.bookingLink"
              target="_blank"
              class="w-full sm:w-auto text-center group relative overflow-hidden px-10 py-5 bg-clinic-gold text-black rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-500 hover:bg-white shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <span class="relative z-10 flex items-center justify-center gap-2">
                {{ content.hero.cta }}
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
              <div class="absolute inset-0 bg-white/40 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </a>
            
            <RouterLink 
              to="/servicios"
              class="w-full sm:w-auto text-center px-10 py-5 border border-white/20 text-white rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              Ver Tratamientos
            </RouterLink>
          </div>

        </div>
      </div>
      
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span class="text-[9px] uppercase tracking-widest text-white">Scroll</span>
        <div class="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>

    <div class="relative w-full flex justify-center items-center py-16 bg-[#050505] z-40">
       <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-clinic-gold/40 to-transparent max-w-6xl mx-6"></div>
       <div class="absolute bg-[#050505] px-6">
          <div class="w-3 h-3 border border-clinic-gold rotate-45 shadow-[0_0_15px_#D4AF37]">
            <div class="w-full h-full bg-clinic-gold/50"></div>
          </div>
       </div>
    </div>

    <section class="py-12 md:py-24 bg-[#050505] relative z-40">
      
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] md:w-[800px] h-[500px] md:h-[800px] bg-clinic-gold/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>

      <div class="container mx-auto px-6 relative">
        <div class="text-center mb-16 md:mb-24">
          <span class="text-clinic-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Experiencia y Tecnología</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Nuestros <span class="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-[#fcf6ba] italic">Servicios</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto font-light text-sm md:text-base">Procedimientos mínimamente invasivos diseñados para resaltar tu belleza natural con precisión médica.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          <ServiceCard
            v-for="(service, index) in content.services.slice(0, 3)"
            :key="service.id"
            :title="service.title"
            :description="service.shortDesc"
            class="service-card-dark bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 hover:border-clinic-gold/60 text-gray-300 group min-h-[300px]"
            :style="{ transitionDelay: `${index * 100}ms` }"
          />
        </div>

        <div class="mt-20 text-center">
          <RouterLink
            to="/servicios"
            class="group inline-flex items-center text-white font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase transition-all hover:text-clinic-gold py-4"
          >
            <span class="border-b border-white/20 group-hover:border-clinic-gold pb-1 transition-all duration-300">Explorar menú completo</span>
            <span class="ml-4 transform group-hover:translate-x-2 transition-transform duration-300 text-clinic-gold">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <div class="relative py-20 bg-[#050505] flex items-center justify-center z-40 overflow-hidden">
       <div class="absolute w-full h-[1px] bg-white/5"></div>
       <span class="relative bg-[#050505] px-12 text-center">
         <span class="block text-clinic-gold font-serif text-3xl md:text-4xl italic mb-2">Resultados Reales</span>
         <span class="block text-[10px] text-gray-500 tracking-[0.4em] uppercase">Pacientes Leales</span>
       </span>
    </div>

    <InstagramGallery />
  </div>
</template>

<style scoped>
/* ESTILOS ESPECÍFICOS PARA DARK MODE */

/* Animaciones */
.animate-slow-zoom {
  animation: slowZoom 30s ease-in-out infinite alternate;
  will-change: transform;
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}

.animate-reveal {
  animation: reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

@keyframes reveal {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-luxury-entrance {
  animation: luxuryEntrance 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  will-change: transform, opacity;
}

@keyframes luxuryEntrance {
  0% { opacity: 0; transform: translateX(20px) scale(0.95); filter: blur(5px); }
  100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
}

.animate-slide-up {
  animation: slideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s backwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.balance {
  text-wrap: balance;
}

/* Utilidad para enmascarar la imagen del doctor suavemente en la parte inferior */
.mask-image-gradient {
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

/* OVERRIDES PARA SERVICE CARD EN MODO OSCURO */
:deep(.service-card-dark) {
  background-color: rgba(10, 10, 10, 0.6) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.service-card-dark:hover) {
  transform: translateY(-5px);
  background-color: rgba(20, 20, 20, 0.9) !important;
  border-color: rgba(212, 175, 55, 0.4);
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.8);
}

:deep(.service-card-dark h3) {
  color: #ffffff !important;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}

:deep(.service-card-dark p) {
  color: #9ca3af !important;
  font-weight: 300;
}

:deep(.service-card-dark svg), 
:deep(.service-card-dark i) {
  color: #D4AF37 !important;
}
</style>