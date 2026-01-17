<script setup>
import { onMounted, ref } from 'vue';
import faceFemale from '../../assets/img/loader/face_female.png';
import faceMale from '../../assets/img/loader/face_male.png';

// Propiedad para controlar si se muestra o no (controlado desde el padre)
defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden">
      
      <div class="absolute inset-0 bg-radial-gold opacity-20"></div>

      <div class="relative w-full max-w-4xl h-64 flex items-center justify-center">
        
        <div class="absolute left-0 md:left-20 opacity-0 animate-slide-in-left h-full flex items-center">
          <img 
            :src="faceFemale" 
            alt="Silhouette" 
            class="h-48 md:h-64 w-auto object-contain"
          />
        </div>

        <div class="z-10 text-center animate-pulse-gold">
          <h1 class="font-serif text-3xl md:text-5xl text-clinic-gold tracking-widest font-bold">
            DR. ARELLANO
          </h1>
          <div class="h-[1px] w-0 bg-clinic-gold mx-auto mt-2 animate-expand-line"></div>
        </div>

        <div class="absolute right-0 md:right-20 opacity-0 animate-slide-in-right h-full flex items-center">
          <img 
            :src="faceMale" 
            alt="Silhouette" 
            class="h-48 md:h-64 w-auto object-contain"
          />
        </div>

      </div>
      
      <div class="absolute bottom-10 w-full flex justify-center">
         <div class="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div class="h-full bg-clinic-gold animate-loading-bar"></div>
         </div>
      </div>

    </div>
  </Transition>
</template>

<style scoped>
/* Fondo Radial Sutil */
.bg-radial-gold {
  background: radial-gradient(circle at center, rgba(212, 175, 85, 0.15) 0%, rgba(5, 5, 5, 0) 70%);
}

/* Transición de Salida (Fade Out) del componente completo */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animaciones Internas */

/* Las caras entran suavemente desde los lados */
.animate-slide-in-left {
  animation: slideInLeft 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.animate-slide-in-right {
  animation: slideInRight 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

/* El texto brilla suavemente */
.animate-pulse-gold {
  animation: textShimmer 2s infinite alternate;
}

@keyframes textShimmer {
  from { opacity: 0.8; text-shadow: 0 0 10px rgba(212,175,55,0); }
  to { opacity: 1; text-shadow: 0 0 20px rgba(212,175,55,0.4); }
}

/* Línea decorativa se expande */
.animate-expand-line {
  animation: expandLine 1s ease-out forwards 0.3s;
}

@keyframes expandLine {
  to { w: 100%; }
}

/* Barra de carga infinita */
.animate-loading-bar {
  width: 50%;
  animation: loading 1s infinite linear;
}

@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}

/* Clase de utilidad para invertir colores si las imágenes son negras */
.invert {
  filter: invert(1) brightness(0.8) sepia(1) hue-rotate(5deg) saturate(3); 
  /* Esto convierte negro a un tono dorado pálido/blanco dependiendo de la imagen original */
}
</style>