<template>
  <div class="group relative bg-white rounded-2xl shadow-soft p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-transparent hover:border-clinic-gold/30">
    <div class="absolute -top-6 left-8 bg-clinic-navy text-white p-3 rounded-xl shadow-lg group-hover:bg-clinic-gold transition-colors duration-300">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    </div>
    
    <h3 class="mt-8 text-xl font-serif font-bold text-clinic-navy group-hover:text-clinic-gold transition-colors">
      {{ title }}
    </h3>
    
    <p class="mt-4 text-gray-500 text-sm leading-relaxed">
      {{ description }}
    </p>
    
    <div class="mt-6 flex items-center text-clinic-gold font-medium text-sm font-sans">
      <span>Más detalles</span>
      <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String
})
</script>