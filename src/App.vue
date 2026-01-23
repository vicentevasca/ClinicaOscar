<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Layout/Navbar.vue';
import Footer from './components/Layout/Footer.vue';
import LoadingScreen from './components/UI/LoadingScreen.vue';

const router = useRouter();
const isLoading = ref(true); 

// Interceptamos la navegación
router.beforeEach((to, from, next) => {
  isLoading.value = true;
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 900);
});
</script>

<template>
  <LoadingScreen :isLoading="isLoading" />

  <div 
    class="flex flex-col min-h-screen font-sans text-slate-800 transition-opacity duration-700 ease-in-out bg-slate-50 relative"
    :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
  >
    <Navbar />
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <Footer />

    <div 
      class="fixed bottom-6 right-4 md:bottom-10 md:right-10 z-[90] transition-all duration-1000 transform"
      :class="isLoading ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
    >
      <router-link 
        to="/informacion" 
        class="group relative flex items-center justify-center p-[2px] rounded-full overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-shadow duration-500"
      >
        <span class="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#D4AF37_50%,#000000_100%)] animate-[spin_4s_linear_infinite]"></span>
        
        <div class="relative flex items-center gap-3 bg-[#0a0a0a] px-5 py-3 md:px-6 md:py-4 rounded-full border border-white/10 group-hover:bg-[#111] transition-colors">
           <div class="relative">
             <span class="text-xl md:text-2xl animate-pulse">✨</span>
           </div>
           <div class="flex flex-col">
             <span class="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest leading-none">Descubre tu</span>
             <span class="text-xs md:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-[#fcf6ba] uppercase tracking-wide">Tratamiento Ideal</span>
           </div>
        </div>
      </router-link>
    </div>

  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>