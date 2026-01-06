<script setup>
import content from '../data/content.json';
import ServiceCard from '../components/UI/ServiceCard.vue';
</script>

<template>
  <div class="pt-28 pb-20 bg-gradient-to-b from-white to-slate-50 min-h-screen">
    <div class="container mx-auto px-6">
      
      <div class="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
        <span class="text-clinic-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
          Nuestra Excelencia
        </span>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-clinic-navy mb-6">
          Tratamientos y Servicios
        </h1>
        <div class="h-1 w-20 bg-clinic-gold mx-auto mb-8 rounded-full"></div>
        <p class="text-gray-600 text-lg leading-relaxed font-light">
          Descubre nuestra gama de servicios diseñados meticulosamente para tu bienestar emocional, combinando ciencia y empatía en cada sesión.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        <ServiceCard 
          v-for="(service, index) in content.services" 
          :key="service.id"
          :title="service.title"
          :description="service.shortDesc"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        />
      </div>

      <div class="max-w-4xl mx-auto bg-clinic-navy rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden group">
        
        <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-700"></div>

        <div class="relative z-10 text-center md:text-left">
          <h3 class="text-2xl font-serif font-bold text-white mb-2">Facilidades de Pago</h3>
          <p class="text-gray-300 font-light">
            Invierte en ti con tranquilidad. Aceptamos todas las tarjetas.
          </p>
        </div>

        <div class="flex items-center gap-6 relative z-10">
           <div class="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10 h-12 w-20 flex items-center justify-center">
             <svg class="w-full h-full text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.89 31.972l2.946-17.767h4.74l-2.947 17.767h-4.739zM31.295 14.508c-1.077-.42-2.923-.848-4.996-.848-5.503 0-9.375 2.87-9.395 6.985-.022 3.033 2.77 4.73 4.885 5.753 2.162 1.05 2.895 1.722 2.887 2.664-.012 1.436-1.764 2.096-3.394 2.096-2.27 0-3.483-.34-5.323-1.127l-.744-.344-3.085 14.364c.995.443 2.824.82 4.717.84 6.946 0 11.455-3.337 11.48-8.506.014-2.836-1.737-4.996-5.545-6.79-2.31-1.135-2.983-1.905-2.983-3.064 0-1.056 1.206-2.13 3.82-2.13 1.303-.024 2.257.29 2.99.59l.358.172 4.228-10.655zM44.08 31.972l4.137-17.767h-4.228c-1.31 0-2.458.766-2.972 1.956l-8.46 19.86h5.025l.998-2.736h6.14l.582 2.736h4.778v-4.049zm-8.25-6.612l2.67-7.252 1.522 7.252h-4.192zM12.982 14.205H8.72l-5.61 17.767h4.942l.85-2.28 4.08-15.487z" fill="currentColor"/></svg>
           </div>
           <div class="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10 h-12 w-20 flex items-center justify-center">
             <svg class="w-full h-full text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="12" r="7" fill="currentColor" fill-opacity="0.5"/><circle cx="17" cy="12" r="7" fill="currentColor" fill-opacity="0.5"/></svg>
           </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>