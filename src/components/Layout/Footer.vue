<script setup>
import { RouterLink } from 'vue-router';
import content from '../../data/content.json';
</script>

<template>
  <footer class="bg-[#050505] text-white pt-24 pb-10 relative overflow-hidden selection:bg-clinic-gold selection:text-black">
    
    <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-clinic-gold to-transparent opacity-70"></div>

    <div class="absolute top-10 right-0 text-[15rem] leading-none text-white opacity-[0.02] font-serif font-bold pointer-events-none select-none z-0">
      DA
    </div>

    <div class="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-clinic-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
        
        <div class="md:col-span-5">
          <RouterLink to="/" class="inline-block mb-6 group">
            <h3 class="text-3xl font-serif font-bold text-white tracking-tight">
              Dr. <span class="text-clinic-gold italic group-hover:not-italic transition-all duration-300">Arellano</span>
            </h3>
          </RouterLink>
          
          <p class="text-gray-400 font-sans leading-relaxed text-base max-w-sm mb-6">
            {{ content.brand.tagline }}
          </p>
          <p class="text-gray-500 text-sm font-light border-l border-clinic-gold/30 pl-4">
            Comprometidos con tu evolución personal en un entorno de absoluta confidencialidad y confort.
          </p>
          
          <div class="mt-8 flex space-x-6">
            <a href="https://instagram.com" target="_blank" class="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-1.077 1.583c-2.33 0-2.58.01-3.606.056-.934.043-1.438.196-1.774.327-.435.169-.747.37-.996.793a3.09 3.09 0 00-.51 1.068c-.13.337-.283.84-.326 1.775-.047 1.025-.057 1.275-.057 3.605s.01 2.58.057 3.606c.043.935.196 1.439.326 1.775.169.435.37.747.794.996a3.09 3.09 0 001.067.51c.337.13.841.284 1.775.326 1.025.047 1.275.057 3.605.057 2.331 0 2.581-.01 3.606-.057.935-.043 1.439-.196 1.775-.326.435-.169.747-.37.996-.794a3.09 3.09 0 00.51-1.067c.13-.336.284-.84.326-1.775.047-1.025.057-1.275.057-3.605s-.01-2.58-.057-3.606c-.043-.935-.196-1.438-.326-1.775a3.09 3.09 0 00-.794-.996 3.09 3.09 0 00-1.067-.51c-.336-.13-.84-.284-1.775-.326-1.025-.047-1.275-.057-3.605-.057z" clip-rule="evenodd" /></svg>
            </a>
          </div>
        </div>

        <div class="md:col-span-3 lg:col-start-7">
          <h4 class="text-[10px] font-bold mb-6 uppercase tracking-[0.2em] text-clinic-gold">Menu Principal</h4>
          <ul class="space-y-4 font-sans text-gray-400 text-sm">
            <li><RouterLink to="/" class="hover:text-white hover:pl-2 transition-all duration-300 block">Inicio</RouterLink></li>
            <li><RouterLink to="/nosotros" class="hover:text-white hover:pl-2 transition-all duration-300 block">Sobre Mí</RouterLink></li>
            <li><RouterLink to="/servicios" class="hover:text-white hover:pl-2 transition-all duration-300 block">Tratamientos</RouterLink></li>
            <li><RouterLink to="/contacto" class="hover:text-white hover:pl-2 transition-all duration-300 block">Contacto</RouterLink></li>
          </ul>
        </div>

        <div class="md:col-span-4 lg:col-span-3">
          <h4 class="text-[10px] font-bold mb-6 uppercase tracking-[0.2em] text-clinic-gold">Contacto Privado</h4>
          <ul class="space-y-6 font-sans text-gray-400 text-sm">
            <li class="flex items-start group cursor-default">
              <span class="mr-4 text-clinic-gold group-hover:text-white transition-colors mt-0.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </span>
              <span class="leading-relaxed group-hover:text-white transition-colors">{{ content.contact.address }}</span>
            </li>
            <li class="flex items-center group cursor-default">
              <span class="mr-4 text-clinic-gold group-hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </span>
              <span class="group-hover:text-white transition-colors">{{ content.contact.phone }}</span>
            </li>
            <li class="flex items-center group cursor-default">
              <span class="mr-4 text-clinic-gold group-hover:text-white transition-colors">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </span>
              <span class="group-hover:text-white transition-colors">{{ content.contact.email }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-sans">
        <p>&copy; {{ new Date().getFullYear() }} {{ content.brand.name }}. Excellence in Aesthetics.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-clinic-gold transition-colors">Política de Privacidad</a>
          <a href="#" class="hover:text-clinic-gold transition-colors">Términos de Uso</a>
        </div>
      </div>
    </div>
  </footer>
</template>