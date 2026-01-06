<script setup>
import { RouterLink } from 'vue-router';
import content from '../data/content.json';
import ServiceCard from '../components/UI/ServiceCard.vue'; 
import InstagramGallery from '../components/UI/InstagramGallery.vue';

import oscarHero from '../assets/img/oscar_hero.png';
import heroBackground from '../assets/img/hero_background.avif';

</script>

<template>
  <div>
    <section class="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-white selection:bg-clinic-gold/30">
      
      <div class="absolute inset-0 z-0">
        <img 
          :src=heroBackground 
          alt="Clínica Estética" 
          class="w-full h-full object-cover object-center opacity-60 md:opacity-100 scale-105 animate-slow-zoom"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent md:bg-gradient-to-r md:from-white md:via-white/95 md:to-transparent"></div>
      </div>

      <div class="absolute bottom-0 right-0 z-20 w-full flex justify-end items-end pointer-events-none">
        <div class="relative w-[80%] md:w-[55%] lg:w-[48%] xl:w-[42%] max-w-[900px] animate-luxury-entrance">
          <div class="absolute inset-0 bg-clinic-gold/10 blur-[100px] rounded-full transform translate-y-20 scale-120"></div>
          
          <img 
            :src="oscarHero" 
            alt="Dr. Oscar Arellano" 
            class="relative z-20 w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] object-contain transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
      </div>

      <div class="container mx-auto px-6 relative z-30">
        <div class="max-w-xl md:max-w-2xl animate-slide-up transform -translate-y-16 md:translate-y-0 pt-20 md:pt-0">
          <div class="overflow-hidden mb-4">
            <span class="inline-block text-clinic-gold font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs animate-reveal">
              Bienvenido a la excelencia
            </span>
          </div>
          
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-clinic-navy leading-[1.1] mb-6 balance">
            {{ content.hero.title }}
          </h1>
          
          <p class="text-base md:text-lg text-gray-700 md:text-gray-600 mb-10 font-sans leading-relaxed max-w-lg">
            {{ content.hero.subtitle }}
          </p>
          
          <div class="flex flex-col sm:flex-row gap-5 items-center md:items-start">
            <a 
              :href="content.contact.bookingLink"
              target="_blank"
              class="group relative overflow-hidden px-10 py-4 bg-clinic-navy text-white rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-500 hover:bg-clinic-gold shadow-xl hover:shadow-clinic-gold/20"
            >
              <span class="relative z-10">{{ content.hero.cta }}</span>
              <div class="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </a>
            
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-50 relative z-40">
      <div class="container mx-auto px-6">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl font-serif font-bold text-clinic-navy mb-5">Nuestros Servicios</h2>
          <div class="h-1 w-20 bg-clinic-gold mx-auto rounded-full"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ServiceCard 
            v-for="(service, index) in content.services.slice(0, 3)" 
            :key="service.id"
            :title="service.title"
            :description="service.shortDesc"
            class="hover:-translate-y-3 transition-transform duration-500"
            :style="{ transitionDelay: `${index * 100}ms` }"
          />
        </div>

        <div class="mt-20 text-center">
          <RouterLink to="/servicios" class="group inline-flex items-center text-clinic-gold font-bold tracking-widest text-sm uppercase transition-all">
            <span class="border-b border-clinic-gold/0 group-hover:border-clinic-gold pb-1 transition-all">Ver todos los tratamientos</span>
            <span class="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <InstagramGallery />
  </div>
</template>

<style scoped>
/* 1. Zoom Suave al fondo para dar vida */
.animate-slow-zoom {
  animation: slowZoom 20s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

/* 2. Revelación de texto (Stagger effect) */
.animate-reveal {
  animation: reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

@keyframes reveal {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* 3. Animación de entrada Luxury (Imagen Dr) */
.animate-luxury-entrance {
  animation: luxuryEntrance 2.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  will-change: transform, opacity;
}

@keyframes luxuryEntrance {
  0% { opacity: 0; transform: translateX(50px) scale(0.95); filter: blur(10px); }
  100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
}

/* 4. Optimización de Animación de Texto (Slide Up) */
.animate-slide-up {
  animation: slideUpMobile 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.4s backwards;
}

@media (min-width: 768px) {
  .animate-slide-up {
    animation: slideUpDesktop 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.4s backwards;
  }
}

@keyframes slideUpMobile {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUpDesktop {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mejora de renderizado de texto */
.balance {
  text-wrap: balance;
}
</style>