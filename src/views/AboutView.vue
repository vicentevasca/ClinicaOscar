<script setup>
import { RouterLink } from 'vue-router';
import content from '../data/content.json';

import oscarPerfil from '../assets/img/oscar_perfil.png';

const signatureText = "Dr. Oscar Arellano";
</script>

<template>
  <div class="pt-28 pb-20 bg-white min-h-screen overflow-hidden">
    <div class="container mx-auto px-6">
      
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <div class="w-full lg:w-1/2 relative group">
          <div class="absolute inset-0 bg-clinic-navy transform translate-x-6 translate-y-6 rounded-sm opacity-10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"></div>
          <div class="absolute inset-0 border-2 border-clinic-gold transform -translate-x-4 -translate-y-4 rounded-sm transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
          
          <div class="relative overflow-hidden rounded-sm shadow-2xl">
             <img 
              :src="oscarPerfil" 
              alt="Dr. Oscar Arellano - Cirujano Dentista" 
              class="w-auto h-auto object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            
            <div class="absolute bottom-20 right-2 bg-white/95 backdrop-blur-md p-4 shadow-xl border-l-4 border-clinic-gold max-w-[220px]">
              <p class="text-xs text-clinic-gold font-bold uppercase tracking-widest mb-1">Registro Salud</p>
              <p class="text-sm text-clinic-navy font-medium leading-tight">Cirujano Dentista especializado en Estética Facial</p>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/2">
          
          <div class="mb-8">
            <span class="text-clinic-gold font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2 mb-4">
              <span class="w-8 h-[1px] bg-clinic-gold"></span>
              Excelencia Clínica
            </span>
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-clinic-navy leading-tight">
              {{ content.brand.name }}
            </h1>
            <p class="text-clinic-gold font-medium mt-2 italic">Cirujano Dentista · Universidad Autónoma de Chile</p>
          </div>

          <blockquote class="border-l-4 border-clinic-gold pl-6 py-2 my-8 italic text-xl text-gray-700 font-serif">
            "Mi objetivo no es transformar rostros, sino potenciar la belleza única de cada paciente mediante la armonía y el equilibrio natural."
          </blockquote>

          <div class="space-y-6 text-gray-600 font-sans leading-relaxed text-lg font-light">
            <p>
              Como especialista en Armonización Facial, entiendo que cada rostro cuenta una historia diferente. Mi enfoque combina la precisión técnica de la odontología con una visión artística de la estética facial avanzada.
            </p>
            <p>
              Utilizo procedimientos mínimamente invasivos y productos de la más alta gama para garantizar resultados seguros, sutiles y, por sobre todo, naturales. Mi compromiso es brindarte un espacio de confianza donde tu bienestar es la prioridad.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 border-t border-gray-100 pt-8">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-clinic-bg rounded-full text-clinic-navy">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-clinic-navy text-lg font-serif">Cirujano Dentista</h4>
                <p class="text-sm text-gray-500">U. Autónoma de Chile</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="p-3 bg-clinic-bg rounded-full text-clinic-navy">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-clinic-navy text-lg font-serif">Armonización</h4>
                <p class="text-sm text-gray-500">Estética Facial Integral</p>
              </div>
            </div>
          </div>

          <div class="mt-12 flex items-center justify-between border-t border-gray-50 pt-8">
            <div class="text-3xl text-clinic-gold font-serif italic opacity-80 select-none">
              {{ signatureText }}
            </div>
            
            <RouterLink 
              to="/contacto" 
              class="group inline-flex items-center text-clinic-navy font-bold hover:text-clinic-gold transition-colors"
            >
              Contactar ahora
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Transición suave para la carga de la página */
.container {
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>