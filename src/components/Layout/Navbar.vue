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

// Bloquear el scroll del cuerpo cuando el menú móvil está abierto
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
  { name: 'Sobre Mí', path: '/nosotros' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Contacto', path: '/contacto' },
];
</script>

<template>
  <header 
    :class="[
      'fixed w-full z-[100] transition-all duration-500',
      isScrolled || isMobileMenuOpen
        ? 'bg-white shadow-md py-3' 
        : 'bg-transparent py-6'
    ]"
  >
    <nav class="container mx-auto px-6 flex justify-between items-center relative z-[110]">
      <RouterLink to="/" @click="closeMobileMenu" class="text-2xl font-serif font-bold text-clinic-navy tracking-tight">
        Dr. <span class="text-clinic-gold">Arellano</span>
      </RouterLink>

      <div class="hidden md:flex space-x-8 items-center">
        <RouterLink 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="text-xs font-bold hover:text-clinic-gold transition-colors uppercase tracking-[0.15em] relative group"
          :class="isScrolled ? 'text-gray-600' : 'text-clinic-navy'"
        >
          {{ link.name }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-clinic-gold transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>
        
        <a 
          :href="content.contact.bookingLink" 
          target="_blank"
          class="ml-4 px-7 py-2.5 bg-clinic-navy text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-clinic-gold transition-all duration-300 shadow-lg hover:shadow-clinic-gold/20 transform hover:-translate-y-0.5"
        >
          Agendar Hora
        </a>
      </div>

      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen" 
        class="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
        aria-label="Menu"
      >
        <div class="w-6 flex flex-col items-end justify-center gap-1.5">
          <span :class="isMobileMenuOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'" class="block h-0.5 bg-clinic-navy transition-all duration-300"></span>
          <span :class="isMobileMenuOpen ? 'opacity-0' : 'w-4'" class="block h-0.5 bg-clinic-navy transition-all duration-300"></span>
          <span :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-5'" class="block h-0.5 bg-clinic-navy transition-all duration-300"></span>
        </div>
      </button>
    </nav>

    <Transition name="fade-slide">
      <div 
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-8 md:hidden"
      >
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div class="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-clinic-gold blur-3xl"></div>
          <div class="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-clinic-navy blur-3xl"></div>
        </div>

        <div class="flex flex-col items-center space-y-8 w-full relative z-10">
          <RouterLink 
            v-for="(link, index) in navLinks" 
            :key="link.path" 
            :to="link.path"
            @click="closeMobileMenu"
            class="text-3xl font-serif text-clinic-navy hover:text-clinic-gold transition-all duration-300 transform opacity-0 animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            {{ link.name }}
          </RouterLink>
          
          <div class="w-12 h-[1px] bg-clinic-gold/30 my-4"></div>
          
          <a 
            :href="content.contact.bookingLink"
            target="_blank" 
            class="w-full max-w-xs text-center px-8 py-4 bg-clinic-navy text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-xl opacity-0 animate-fade-in-up"
            style="animation-delay: 400ms;"
          >
            Agendar Evaluación
          </a>
        </div>

        <div class="absolute bottom-12 flex space-x-6 opacity-0 animate-fade-in-up" style="animation-delay: 500ms;">
           <span class="text-xs font-bold text-clinic-gold uppercase tracking-widest italic">Dr. Oscar Arellano</span>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Transición del contenedor del menú */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animación de los links individuales */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Evitar que el header sea transparente sobre el menú móvil */
header.bg-white {
  backdrop-blur: none !important;
}
</style>