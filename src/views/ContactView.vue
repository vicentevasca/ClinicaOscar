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
    // Aquí podrías integrar con Formspree o un backend real
  }, 1500);
};
</script>

<template>
  <div class="pt-28 pb-20 bg-slate-50 min-h-screen">
    <div class="container mx-auto px-6">
      
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-clinic-gold font-bold tracking-widest uppercase text-xs mb-3 block">Contacto Directo</span>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-clinic-navy mb-6">Agenda tu Evaluación</h1>
        <p class="text-gray-600">Comienza tu camino hacia la armonía facial. Atendemos consultas en clínicas asociadas en Santiago, con disponibilidad especial los fines de semana.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        <div class="space-y-6">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group hover:border-clinic-gold transition-colors">
            <div class="w-12 h-12 bg-clinic-bg rounded-full flex items-center justify-center text-clinic-navy mb-4 group-hover:bg-clinic-navy group-hover:text-white transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <h3 class="font-serif font-bold text-clinic-navy text-xl mb-2">Llamada o WhatsApp</h3>
            <p class="text-gray-600 mb-4">{{ content.contact.phone }}</p>
            <a :href="`https://wa.me/${content.contact.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="text-clinic-gold font-bold text-sm uppercase tracking-wider hover:underline">Enviar mensaje →</a>
          </div>

          <div class="bg-clinic-navy p-8 rounded-2xl shadow-xl text-white">
            <h3 class="font-serif font-bold text-clinic-gold text-xl mb-4">Horarios de Atención</h3>
            <ul class="space-y-3 text-slate-300">
              <li class="flex justify-between border-b border-white/10 pb-2">
                <span>Lunes - Viernes</span>
                <span class="text-white italic">Cerrado</span>
              </li>
              <li class="flex justify-between border-b border-white/10 pb-2">
                <span>Sábados</span>
                <span class="text-white">09:00 - 19:00</span>
              </li>
              <li class="flex justify-between">
                <span>Domingos</span>
                <span class="text-white">10:00 - 14:00</span>
              </li>
            </ul>
            <p class="mt-6 text-xs text-slate-400 font-light">* Sujeto a disponibilidad y previa reserva.</p>
          </div>
        </div>

        <div class="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-gray-100">
          <form v-if="!submitted" @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Nombre Completo</label>
              <input v-model="formData.name" type="text" required placeholder="Ej: Marcela Paz" 
                class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/10 outline-none transition-all" />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email de Contacto</label>
              <input v-model="formData.email" type="email" required placeholder="marcela@ejemplo.com"
                class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/10 outline-none transition-all" />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">WhatsApp / Teléfono</label>
              <input v-model="formData.phone" type="tel" required placeholder="+56 9 ..."
                class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/10 outline-none transition-all" />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Tratamiento de Interés</label>
              <select v-model="formData.service" required 
                class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/10 outline-none transition-all appearance-none bg-white">
                <option value="" disabled>Seleccione una opción</option>
                <option v-for="s in content.services" :key="s.id" :value="s.title">{{ s.title }}</option>
                <option value="Evaluación Integral">Evaluación Integral</option>
                <option value="Otro">Otro procedimiento</option>
              </select>
            </div>

            <div class="space-y-2 md:col-span-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Cuéntanos tus dudas</label>
              <textarea v-model="formData.message" rows="4" placeholder="¿En qué podemos ayudarte?"
                class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/10 outline-none transition-all resize-none"></textarea>
            </div>

            <div class="md:col-span-2 pt-4">
              <button type="submit" :disabled="isSubmitting"
                class="w-full bg-clinic-navy text-white font-bold py-5 rounded-xl hover:bg-clinic-gold transform hover:-translate-y-1 transition-all duration-300 shadow-lg disabled:bg-gray-400">
                <span v-if="!isSubmitting">Agendar Evaluación Ahora</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              </button>
              <p class="text-center text-gray-400 text-xs mt-4 italic">El Dr. se pondrá en contacto contigo a la brevedad.</p>
            </div>

          </form>

          <div v-else class="text-center py-12 animate-fade-in">
            <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 class="text-3xl font-serif font-bold text-clinic-navy mb-4">¡Solicitud Recibida!</h2>
            <p class="text-gray-600 mb-8">Gracias por confiar en nosotros, {{ formData.name.split(' ')[0] }}. Te contactaremos pronto al número {{ formData.phone }} para confirmar tu hora.</p>
            <button @click="submitted = false" class="text-clinic-gold font-bold hover:underline">Volver al formulario</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>