<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Layout/Navbar.vue';
import Footer from './components/Layout/Footer.vue';
import LoadingScreen from './components/UI/LoadingScreen.vue';

const router = useRouter();
const isLoading = ref(true); // Inicia en true para la primera carga

// Interceptamos la navegación antes de cambiar de ruta
router.beforeEach((to, from, next) => {
  isLoading.value = true;
  next();
});

// Cuando la navegación termina
router.afterEach(() => {
  // Mantenemos la pantalla de carga 1.2 segundos para que la animación
  // de las siluetas se aprecie y la transición sea elegante, no abrupta.
  setTimeout(() => {
    isLoading.value = false;
  }, 900);
});
</script>

<template>
  <LoadingScreen :isLoading="isLoading" />

  <div 
    class="flex flex-col min-h-screen font-sans text-slate-800 transition-opacity duration-700 ease-in-out bg-slate-50"
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
  </div>
</template>

<style>
/* Tu estilo original para la transición entre rutas internas */
.fade-enter-active, .fade-leave-active { transition: opacity 0.9s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>