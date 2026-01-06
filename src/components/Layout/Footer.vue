<script setup>
import { RouterLink } from 'vue-router';
import content from '../../data/content.json';
</script>

<template>
  <footer class="bg-clinic-navy text-white pt-20 pb-10 border-t-4 border-clinic-gold relative overflow-hidden">
    
    <div class="absolute -top-10 -right-10 text-9xl text-white opacity-[0.03] font-serif font-bold pointer-events-none select-none">
      DA
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
        
        <div class="md:col-span-5">
          <h3 class="text-3xl font-serif font-bold text-white mb-4 tracking-tight">
            Dr. <span class="text-clinic-gold">Arellano</span>
          </h3>
          <p class="text-slate-300 font-sans leading-relaxed text-base max-w-sm">
            {{ content.brand.tagline }}
          </p>
          <p class="mt-4 text-slate-400 text-sm font-light">
            Comprometidos con tu evolución personal en un entorno de absoluta confidencialidad y confort.
          </p>
          
          <div class="mt-8 flex space-x-6">
            <a href="#" class="text-slate-400 hover:text-clinic-gold transition-colors transform hover:-translate-y-1 duration-300">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-1.077 1.583c-2.33 0-2.58.01-3.606.056-.934.043-1.438.196-1.774.327-.435.169-.747.37-.996.793a3.09 3.09 0 00-.51 1.068c-.13.337-.283.84-.326 1.775-.047 1.025-.057 1.275-.057 3.605s.01 2.58.057 3.606c.043.935.196 1.439.326 1.775.169.435.37.747.794.996a3.09 3.09 0 001.067.51c.337.13.841.284 1.775.326 1.025.047 1.275.057 3.605.057 2.331 0 2.581-.01 3.606-.057.935-.043 1.439-.196 1.775-.326.435-.169.747-.37.996-.794a3.09 3.09 0 00.51-1.067c.13-.336.284-.84.326-1.775.047-1.025.057-1.275.057-3.605s-.01-2.58-.057-3.606c-.043-.935-.196-1.438-.326-1.775a3.09 3.09 0 00-.794-.996 3.09 3.09 0 00-1.067-.51c-.336-.13-.84-.284-1.775-.326-1.025-.047-1.275-.057-3.605-.057z" clip-rule="evenodd" /></svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-clinic-gold transition-colors transform hover:-translate-y-1 duration-300">
               <span class="sr-only">Facebook</span>
               <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
            </a>
          </div>
        </div>

        <div class="md:col-span-3 lg:col-start-7">
          <h4 class="text-sm font-bold mb-6 uppercase tracking-widest text-clinic-gold">Explorar</h4>
          <ul class="space-y-4 font-sans text-slate-300">
            <li><RouterLink to="/" class="hover:text-white hover:translate-x-1 inline-block transition-all">Inicio</RouterLink></li>
            <li><RouterLink to="/nosotros" class="hover:text-white hover:translate-x-1 inline-block transition-all">Sobre Mí</RouterLink></li>
            <li><RouterLink to="/servicios" class="hover:text-white hover:translate-x-1 inline-block transition-all">Tratamientos</RouterLink></li>
            <li><RouterLink to="/contacto" class="hover:text-white hover:translate-x-1 inline-block transition-all">Contacto</RouterLink></li>
          </ul>
        </div>

        <div class="md:col-span-4 lg:col-span-3">
          <h4 class="text-sm font-bold mb-6 uppercase tracking-widest text-clinic-gold">Información</h4>
          <ul class="space-y-6 font-sans text-slate-300">
            <li class="flex items-start group">
              <span class="mr-3 text-clinic-gold group-hover:scale-110 transition-transform mt-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </span>
              <span class="leading-tight">{{ content.contact.address }}</span>
            </li>
            <li class="flex items-center group">
              <span class="mr-3 text-clinic-gold group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </span>
              {{ content.contact.phone }}
            </li>
            <li class="flex items-center group">
              <span class="mr-3 text-clinic-gold group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </span>
              {{ content.contact.email }}
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-sans">
        <p>&copy; {{ new Date().getFullYear() }} {{ content.brand.name }}. Todos los derechos reservados.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-white transition-colors">Política de Privacidad</a>
          <a href="#" class="hover:text-white transition-colors">Términos de Uso</a>
        </div>
      </div>
    </div>
  </footer>
</template>