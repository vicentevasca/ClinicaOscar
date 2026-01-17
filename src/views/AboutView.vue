<script setup>
import { RouterLink } from 'vue-router';
import content from '../data/content.json';
import oscarPerfil from '../assets/img/oscar_perfil.png';

const signatureText = "Dr. Oscar Arellano";
</script>

<template>
  <section class="py-24 bg-[#050505] min-h-screen relative overflow-hidden selection:bg-clinic-gold selection:text-black">
    
    <div class="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-clinic-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <div class="w-full lg:w-1/2 relative group perspective-1000">
          
          <div class="absolute inset-0 bg-white/5 transform translate-x-8 translate-y-8 rounded-sm transition-transform duration-700 group-hover:translate-x-4 group-hover:translate-y-4 border border-white/5"></div>
          
          <div class="absolute inset-0 border border-clinic-gold/60 transform -translate-x-4 -translate-y-4 rounded-sm transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2 z-20 pointer-events-none"></div>
          
          <div class="relative overflow-hidden rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-[#0a0a0a]">
             <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60"></div>

             <img 
               :src="oscarPerfil" 
               alt="Dr. Oscar Arellano - Cirujano Dentista" 
               class="w-full h-auto object-cover object-center transform transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100 grayscale-[20%] group-hover:grayscale-0"
             />
            
            <div class="absolute bottom-10 right-0 lg:-right-6 z-20 bg-[#111111]/90 backdrop-blur-md p-6 shadow-2xl border-l-2 border-clinic-gold max-w-[260px] transform transition-transform duration-500 hover:-translate-y-2">
              <p class="text-[10px] text-clinic-gold font-bold uppercase tracking-[0.2em] mb-2">Registro SIS</p>
              <p class="text-white font-serif text-sm leading-relaxed">
                Cirujano Dentista especializado en <span class="italic text-gray-400">Estética Facial Avanzada</span>.
              </p>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/2">
          
          <div class="mb-10 animate-fade-in">
            <span class="text-clinic-gold font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-3 mb-6">
              <span class="w-12 h-[1px] bg-gradient-to-r from-clinic-gold to-transparent"></span>
              Excelencia Clínica
            </span>
            
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-4">
              {{ content.brand.name }}
            </h1>
            <p class="text-gray-400 text-lg font-light tracking-wide">
              Cirujano Dentista · <span class="text-clinic-gold italic font-serif">Universidad Autónoma de Chile</span>
            </p>
          </div>

          <blockquote class="relative border-l-2 border-clinic-gold/50 pl-8 py-4 my-10 bg-white/5 rounded-r-lg">
            <p class="italic text-xl md:text-2xl text-white font-serif leading-relaxed">
              "Mi objetivo no es transformar rostros, sino potenciar la belleza única de cada paciente mediante la armonía."
            </p>
          </blockquote>

          <div class="space-y-6 text-gray-400 font-sans leading-relaxed text-base md:text-lg font-light">
            <p>
              Como especialista en <strong class="text-white font-normal">Armonización Facial</strong>, entiendo que cada rostro cuenta una historia diferente. Mi enfoque combina la precisión clínica con una visión artística.
            </p>
            <p>
              Utilizo procedimientos mínimamente invasivos y productos de alta gama (Bioestimuladores, Ácido Hialurónico) para garantizar resultados <span class="text-white border-b border-clinic-gold/30 pb-0.5">seguros y naturales</span>.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t border-white/10 pt-10">
            <div class="flex items-start gap-4 group">
              <div class="p-3 bg-white/5 rounded-full text-clinic-gold group-hover:bg-clinic-gold group-hover:text-black transition-all duration-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-base uppercase tracking-wider mb-1">Profesionalismo</h4>
                <p class="text-xs text-gray-500 leading-relaxed">Registro Nacional de Prestadores Individuales de Salud.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 group">
              <div class="p-3 bg-white/5 rounded-full text-clinic-gold group-hover:bg-clinic-gold group-hover:text-black transition-all duration-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-base uppercase tracking-wider mb-1">Vanguardia</h4>
                <p class="text-xs text-gray-500 leading-relaxed">Técnicas avanzadas de rejuvenecimiento sin cirugía.</p>
              </div>
            </div>
          </div>

          <div class="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div class="text-2xl md:text-3xl text-clinic-gold font-serif italic select-none opacity-90 font-light signature-font">
              {{ signatureText }}
            </div>
            
            <RouterLink 
              to="/contacto" 
              class="group relative px-8 py-3 bg-transparent border border-white/30 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:border-clinic-gold transition-all duration-300 overflow-hidden"
            >
              <span class="relative z-10 group-hover:text-clinic-gold transition-colors">Agendar Cita</span>
              <div class="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </RouterLink>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

/* Animación sutil de entrada */
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Opcional: Si quieres una fuente de firma específica */
/* .signature-font { font-family: 'Great Vibes', cursive; } */
</style>