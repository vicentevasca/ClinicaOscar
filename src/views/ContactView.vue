<script setup>
import { ref } from 'vue';
import content from '../data/content.json';

const formData = ref({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
});

const isSubmitting = ref(false);
const submitted = ref(false);

const handleSubmit = () => {
  isSubmitting.value = true;
  // Simulación de envío
  setTimeout(() => {
    isSubmitting.value = false;
    submitted.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1500);
};
</script>

<template>
  <section class="pt-32 pb-24 bg-[#050505] min-h-screen relative overflow-hidden selection:bg-clinic-gold selection:text-black">
    
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-clinic-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      
      <div class="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
        <span class="text-clinic-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block flex items-center justify-center gap-3">
          <span class="w-8 h-[1px] bg-clinic-gold"></span>
          Concierge & Reservas
          <span class="w-8 h-[1px] bg-clinic-gold"></span>
        </span>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Inicia tu Transformación</h1>
        <p class="text-gray-400 font-light text-lg leading-relaxed">
          La armonía facial comienza con una conversación. Agenda tu evaluación privada en nuestras clínicas asociadas.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-4 space-y-6 animate-fade-in-up" style="animation-delay: 100ms;">
          
          <div class="group relative bg-[#0a0a0a] p-8 rounded-sm border border-white/10 hover:border-clinic-gold/50 transition-all duration-500 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-clinic-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-clinic-gold mb-6 group-hover:bg-clinic-gold group-hover:text-black transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            
            <h3 class="font-serif font-bold text-white text-xl mb-2">Contacto Directo</h3>
            <p class="text-gray-500 text-sm mb-6 font-light">Atención personalizada vía WhatsApp para consultas rápidas.</p>
            
            <a :href="`https://wa.me/${content.contact.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white border-b border-clinic-gold pb-1 hover:text-clinic-gold transition-colors">
              Iniciar Chat
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>

          <div class="bg-[#0a0a0a] p-8 rounded-sm border border-white/10 relative overflow-hidden">
            <h3 class="font-serif font-bold text-clinic-gold text-xl mb-6 flex items-center gap-2">
              <span class="w-2 h-2 bg-clinic-gold rounded-full animate-pulse"></span>
              Horarios de Atención
            </h3>
            <ul class="space-y-4 text-sm font-light">
              <li class="flex justify-between items-center text-gray-400">
                <span>Lunes - Viernes</span>
                <span class="px-2 py-1 bg-white/5 rounded text-xs text-gray-500">Clínica / Admin</span>
              </li>
              <li class="flex justify-between items-center text-white">
                <span class="font-medium">Sábados</span>
                <span class="text-clinic-gold">09:00 - 19:00</span>
              </li>
              <li class="flex justify-between items-center text-white">
                <span class="font-medium">Domingos</span>
                <span class="text-clinic-gold">10:00 - 14:00</span>
              </li>
            </ul>
            <p class="mt-8 text-[10px] text-gray-600 uppercase tracking-wider text-center border-t border-white/5 pt-4">
              * Previa reserva confirmada
            </p>
          </div>
        </div>

        <div class="lg:col-span-8 animate-fade-in-up" style="animation-delay: 200ms;">
          <div class="bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 rounded-sm border border-white/10 shadow-2xl relative">
            
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-clinic-gold/50 to-transparent"></div>

            <form v-if="!submitted" @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div class="space-y-2 group">
                <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-clinic-gold transition-colors">Nombre Completo</label>
                <input v-model="formData.name" type="text" required placeholder="Ej: Marcela Paz" 
                  class="w-full bg-white/5 border-b border-white/10 text-white placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-clinic-gold focus:bg-white/10 transition-all duration-300" />
              </div>

              <div class="space-y-2 group">
                <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-clinic-gold transition-colors">Email</label>
                <input v-model="formData.email" type="email" required placeholder="correo@ejemplo.com"
                  class="w-full bg-white/5 border-b border-white/10 text-white placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-clinic-gold focus:bg-white/10 transition-all duration-300" />
              </div>

              <div class="space-y-2 group">
                <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-clinic-gold transition-colors">Teléfono / WhatsApp</label>
                <input v-model="formData.phone" type="tel" required placeholder="+56 9 ..."
                  class="w-full bg-white/5 border-b border-white/10 text-white placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-clinic-gold focus:bg-white/10 transition-all duration-300" />
              </div>

              <div class="space-y-2 group">
                <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-clinic-gold transition-colors">Interés Principal</label>
                <div class="relative">
                  <select v-model="formData.service" required 
                    class="w-full bg-white/5 border-b border-white/10 text-white px-4 py-3 appearance-none focus:outline-none focus:border-clinic-gold focus:bg-white/10 transition-all duration-300 cursor-pointer">
                    <option value="" disabled class="bg-[#111] text-gray-500">Seleccione tratamiento</option>
                    <option v-for="s in content.services" :key="s.id" :value="s.title" class="bg-[#111]">{{ s.title }}</option>
                    <option value="Evaluación Integral" class="bg-[#111]">Evaluación Integral</option>
                    <option value="Otro" class="bg-[#111]">Otro procedimiento</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div class="space-y-2 md:col-span-2 group">
                <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-clinic-gold transition-colors">Detalles Adicionales</label>
                <textarea v-model="formData.message" rows="3" placeholder="¿Tienes alguna duda específica o preferencia de horario?"
                  class="w-full bg-white/5 border-b border-white/10 text-white placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-clinic-gold focus:bg-white/10 transition-all duration-300 resize-none"></textarea>
              </div>

              <div class="md:col-span-2 pt-6">
                <button type="submit" :disabled="isSubmitting"
                  class="w-full group relative overflow-hidden bg-white text-black font-bold uppercase tracking-widest py-4 transition-all duration-300 hover:bg-clinic-gold disabled:opacity-50 disabled:cursor-not-allowed">
                  <div class="absolute inset-0 w-0 bg-clinic-gold transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
                  <span v-if="!isSubmitting" class="relative z-10 flex items-center justify-center gap-2">
                    Solicitar Evaluación
                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                  <span v-else class="relative z-10 flex items-center justify-center">
                    <svg class="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                </button>
                <p class="text-center text-gray-600 text-[10px] uppercase tracking-widest mt-4">
                  Datos protegidos bajo confidencialidad médica.
                </p>
              </div>

            </form>

            <div v-else class="text-center py-16 animate-fade-in flex flex-col items-center justify-center">
              <div class="w-24 h-24 rounded-full border border-clinic-gold/30 flex items-center justify-center mb-8 relative">
                <div class="absolute inset-0 bg-clinic-gold/10 rounded-full animate-ping opacity-75"></div>
                <svg class="w-10 h-10 text-clinic-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path></svg>
              </div>
              
              <h2 class="text-3xl font-serif font-bold text-white mb-4">Solicitud Confirmada</h2>
              <div class="h-[1px] w-16 bg-clinic-gold mx-auto mb-6"></div>
              
              <p class="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed font-light">
                Gracias, <span class="text-white font-medium">{{ formData.name.split(' ')[0] }}</span>. Hemos recibido tu información correctamente. Nuestro equipo de coordinación te contactará al <span class="text-white font-medium">{{ formData.phone }}</span> dentro de las próximas 24 horas hábiles.
              </p>
              
              <button @click="submitted = false" class="text-clinic-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                Realizar otra consulta
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Fix para el autocompletado del navegador para que no rompa el estilo oscuro */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>