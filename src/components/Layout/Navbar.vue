<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import content from '../../data/content.json';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

watch(isMobileMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Contacto', path: '/contacto' },
];
</script>

<template>
  <header 
    :class="[
      'fixed w-full z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
      isScrolled 
        ? 'bg-[#050505]/80 backdrop-blur-xl py-4 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
        : 'bg-transparent py-6 border-b border-transparent'
    ]"
  >
    <nav class="container mx-auto px-6 flex justify-between items-center relative z-[110]">
      
      <RouterLink to="/" @click="closeMobileMenu" class="relative group z-50">
        <div class="flex flex-col leading-none">
            <span class="text-[10px] font-bold text-clinic-gold tracking-[0.4em] uppercase mb-1 opacity-80 group-hover:opacity-100 transition-opacity">Clínica Estética</span>
            <span class="text-2xl font-serif font-bold text-white tracking-tight">
              Dr. <span class="italic font-light text-clinic-gold group-hover:text-clinic-gold transition-colors duration-500">Arellano</span>
            </span>
        </div>
      </RouterLink>

      <div class="hidden md:flex items-center space-x-10">
        <div class="flex space-x-8">
            <RouterLink 
              v-for="link in navLinks" 
              :key="link.path" 
              :to="link.path"
              class="text-[11px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-[0.2em] relative group py-2"
            >
              {{ link.name }}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-clinic-gold transition-all duration-500 group-hover:w-full"></span>
            </RouterLink>
        </div>
        
        <div class="h-8 w-[1px] bg-white/10 mx-4"></div>

        <div class="flex items-center gap-6">
            <RouterLink 
                to="/informacion"
                class="flex items-center gap-2 group"
            >
                <span class="w-2 h-2 rounded-full bg-clinic-gold animate-pulse"></span>
                <span class="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-clinic-gold transition-colors">
                    Diagnóstico IA
                </span>
            </RouterLink>

            <a 
              :href="content.contact.bookingLink" 
              target="_blank"
              class="relative overflow-hidden group px-6 py-2.5 rounded-sm border border-white/20 hover:border-clinic-gold/50 transition-colors duration-500"
            >
              <span class="absolute inset-0 bg-clinic-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span class="relative text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-black transition-colors duration-300">
                Reservar Cita
              </span>
            </a>
        </div>
      </div>

      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen" 
        class="md:hidden group flex items-center gap-3 focus:outline-none z-50 p-2"
        aria-label="Menu Toggle"
      >
        <span class="text-[9px] font-bold uppercase tracking-[0.2em] text-clinic-gold transition-all duration-300"
            :class="isMobileMenuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'">
            Menú
        </span>

        <div class="w-8 h-4 flex flex-col justify-between items-end relative overflow-hidden">
          <span class="block h-[1px] bg-white transition-all duration-500"
            :class="isMobileMenuOpen ? 'w-full -rotate-45 absolute top-1/2 left-0' : 'w-full'"></span>
          <span class="block h-[1px] bg-clinic-gold transition-all duration-500"
            :class="isMobileMenuOpen ? 'opacity-0 translate-x-full' : 'w-2/3 group-hover:w-full'"></span>
          <span class="block h-[1px] bg-white transition-all duration-500"
            :class="isMobileMenuOpen ? 'w-full rotate-45 absolute top-1/2 left-0' : 'w-full'"></span>
        </div>
      </button>
    </nav>

    <Transition name="mobile-menu">
      <div 
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-[#020202]/95 backdrop-blur-2xl z-[100] flex flex-col items-center justify-center overflow-y-auto"
      >
        <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div class="absolute bottom-0 right-0 w-64 h-64 bg-clinic-gold/5 blur-[80px] rounded-full pointer-events-none"></div>

        <div class="flex flex-col items-center w-full px-8 relative z-10 py-10">
          
            <nav class="flex flex-col items-center space-y-6 mb-10">
                <RouterLink 
                v-for="(link, index) in navLinks" 
                :key="link.path" 
                :to="link.path"
                @click="closeMobileMenu"
                class="font-serif text-3xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 hover:to-clinic-gold transition-all duration-500 transform opacity-0 animate-slide-up"
                :style="{ animationDelay: `${150 + (index * 100)}ms` }"
                >
                {{ link.name }}
                </RouterLink>
            </nav>

            <div class="w-full max-w-xs space-y-4 opacity-0 animate-fade-in-up" style="animation-delay: 600ms;">
                
                <RouterLink 
                    to="/informacion"
                    @click="closeMobileMenu"
                    class="flex items-center justify-center gap-3 w-full py-4 border border-clinic-gold/30 bg-clinic-gold/5 rounded-lg text-clinic-gold hover:bg-clinic-gold hover:text-black transition-all duration-300 group"
                >
                    <span class="text-xl">✨</span>
                    <span class="text-xs font-bold uppercase tracking-widest">Diagnóstico Virtual</span>
                </RouterLink>

                <a 
                    :href="content.contact.bookingLink"
                    target="_blank" 
                    class="block w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest text-center border border-white hover:bg-transparent hover:text-white transition-all duration-300"
                >
                    Agendar Cita
                </a>
            </div>

            <div class="mt-12 text-center opacity-0 animate-fade-in" style="animation-delay: 800ms;">
                <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Santiago, Chile</p>
                <p class="text-clinic-gold font-serif italic text-lg">+56 9 1234 5678</p>
            </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Las mismas animaciones que ya tenías, sin cambios necesarios aquí */
.mobile-menu-enter-active,
.mobile-menu-leave-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.mobile-menu-enter-from,
.mobile-menu-leave-to { opacity: 0; backdrop-filter: blur(0); }
.mobile-menu-enter-from .animate-slide-up,
.mobile-menu-leave-to .animate-slide-up { transform: translateY(20px); opacity: 0; }
.animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideUp { from { opacity: 0; transform: translateY(40px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>