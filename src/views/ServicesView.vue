<script setup>
import { computed } from 'vue';
import content from '../data/content.json';

// Función para asignar iconos SVG basados en el título del servicio
// Esto asegura que cada tarjeta tenga identidad visual propia
const getServiceIcon = (title) => {
  const t = title.toLowerCase();
  
  // Icono: Labios / Ácido Hialurónico
  if (t.includes('labio') || t.includes('hialurónico') || t.includes('fillers')) {
    return `<path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />`;
  }
  // Icono: Botox / Toxina / Arrugas
  if (t.includes('botox') || t.includes('toxina') || t.includes('arrugas') || t.includes('superior')) {
    return `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />`;
  }
  // Icono: Rinomodelación / Nariz
  if (t.includes('rino') || t.includes('nariz') || t.includes('perfil')) {
    return `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />`;
  }
  // Icono: Bioestimulación / Piel / Glow
  if (t.includes('bio') || t.includes('piel') || t.includes('glow') || t.includes('vitaminas')) {
    return `<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />`;
  }
  // Default: Estrella / General
  return `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09-3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />`;
};
</script>

<template>
  <div class="pt-32 pb-24 bg-[#050505] min-h-screen relative overflow-hidden selection:bg-clinic-gold selection:text-black">
    
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-clinic-gold/5 blur-[150px] rounded-full pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      
      <div class="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
        <span class="text-clinic-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block flex items-center justify-center gap-3">
          <span class="w-8 h-[1px] bg-clinic-gold"></span>
          Nuestra Excelencia
          <span class="w-8 h-[1px] bg-clinic-gold"></span>
        </span>
        
        <h1 class="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
          Tratamientos & <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Servicios</span>
        </h1>
        
        <p class="text-gray-400 text-lg leading-relaxed font-light max-w-2xl mx-auto">
          Descubre nuestra gama de procedimientos diseñados meticulosamente para armonizar tu belleza natural, combinando ciencia avanzada y arte.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        <div 
          v-for="(service, index) in content.services" 
          :key="service.id"
          class="group relative p-8 rounded-sm bg-[#0a0a0a] border border-white/5 hover:border-clinic-gold/50 transition-all duration-500 animate-fade-in-up hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.1)]"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-clinic-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>

          <div class="relative w-12 h-12 mb-8 text-white/50 group-hover:text-clinic-gold transition-colors duration-500">
             <svg 
               xmlns="http://www.w3.org/2000/svg" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke-width="1" 
               stroke="currentColor" 
               class="w-full h-full"
               v-html="getServiceIcon(service.title)"
             >
             </svg>
          </div>

          <div class="relative z-10">
            <h3 class="text-2xl font-serif text-white mb-3 group-hover:text-clinic-gold transition-colors duration-300">
              {{ service.title }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-gray-400 transition-colors">
              {{ service.shortDesc }}
            </p>
            
            <div class="flex items-center text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
              Saber más <span class="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-clinic-gold/30 to-purple-900/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div class="relative bg-[#080808] border border-white/10 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
          
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>

          <div class="relative z-10 text-center md:text-left">
            <h3 class="text-2xl font-serif font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
              <span class="text-clinic-gold">✦</span> Facilidades de Pago
            </h3>
            <p class="text-gray-400 font-light text-sm tracking-wide">
              Invierte en ti con total tranquilidad. Aceptamos todas las tarjetas de crédito y débito.
            </p>
          </div>

          <div class="flex items-center gap-4 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
             <div class="flex -space-x-4">
               <div class="w-12 h-8 rounded bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center z-10">
                 <div class="w-6 h-4 bg-white/20 rounded-sm"></div>
               </div>
               <div class="w-12 h-8 rounded bg-[#1a1a1a] border border-clinic-gold/30 backdrop-blur-md flex items-center justify-center z-20 shadow-lg transform -translate-y-1">
                 <svg class="w-6 h-6 text-clinic-gold" viewBox="0 0 24 24" fill="currentColor"><path d="M2 7h20v10H2V7zm2 2v6h16V9H4z"/></svg>
               </div>
             </div>
             <span class="text-xs text-gray-500 font-bold tracking-widest uppercase ml-2">Transbank</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>