<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase'; // Asegúrate que la ruta sea correcta

// --- LOGICA NAVBAR ORIGINAL ---
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

watch(isMobileMenuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
});

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Contacto', path: '/contacto' },
];

// --- LOGICA ADMIN (NUEVA) ---
const router = useRouter();
const auth = getAuth(app);
const db = getFirestore(app);
const user = ref(null);
const pendingCount = ref(0);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    
    // Si es admin, escuchar pendientes
    if (currentUser) {
      const q = query(collection(db, "leads"), where("status", "==", "nuevo"));
      onSnapshot(q, (snapshot) => {
        pendingCount.value = snapshot.size;
      });
    } else {
      pendingCount.value = 0;
    }
  });
});

const goToAdmin = () => {
  router.push('/admin');
  closeMobileMenu();
};

const handleLogout = async () => {
  await signOut(auth);
  router.push('/');
  closeMobileMenu();
};
</script>

<template>
  <header 
    :class="[
      'fixed w-full z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
      isScrolled 
        ? 'bg-[#050505]/80 backdrop-blur-xl py-4 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
        : 'bg-transparent py-8'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      
      <RouterLink to="/" class="relative z-50 group">
        <h1 class="text-2xl font-serif italic text-white tracking-wide group-hover:text-clinic-gold transition-colors duration-500">
            Dr. Arellano<span class="text-clinic-gold">.</span>
        </h1>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8">
        <RouterLink 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="text-sm font-light tracking-widest text-gray-300 hover:text-clinic-gold transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-clinic-gold after:transition-all after:duration-300 hover:after:w-full"
        >
          {{ link.name }}
        </RouterLink>

        <div v-if="user" class="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            <button @click="goToAdmin" class="relative text-gray-300 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <span v-if="pendingCount > 0" class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full animate-pulse">
                    {{ pendingCount > 9 ? '+9' : pendingCount }}
                </span>
            </button>
            
            <button @click="goToAdmin" class="text-xs font-bold text-clinic-gold hover:text-white transition-colors uppercase tracking-widest">
                Admin
            </button>
        </div>

        <a v-else href="https://wa.me/56912345678" 
           class="px-6 py-2 bg-white/5 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-clinic-gold hover:text-black hover:border-clinic-gold transition-all duration-300">
          Agendar
        </a>
      </nav>

      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-end gap-1.5 group"
      >
        <span :class="['w-8 h-[1px] bg-white transition-all duration-300', isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-clinic-gold' : '']"></span>
        <span :class="['w-6 h-[1px] bg-white transition-all duration-300', isMobileMenuOpen ? 'opacity-0' : 'group-hover:w-8']"></span>
        <span :class="['w-4 h-[1px] bg-white transition-all duration-300', isMobileMenuOpen ? '-rotate-45 -translate-y-2.5 w-8 bg-clinic-gold' : 'group-hover:w-8']"></span>
      </button>

      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-[#050505]/95 backdrop-blur-xl z-40 flex items-center justify-center">
          <div class="flex flex-col items-center gap-8">
            <RouterLink 
              v-for="(link, i) in navLinks" 
              :key="link.path" 
              :to="link.path"
              @click="closeMobileMenu"
              class="text-3xl font-serif italic text-white hover:text-clinic-gold transition-all duration-500 opacity-0 animate-slide-up"
              :style="{ animationDelay: `${i * 100}ms` }"
            >
              {{ link.name }}
            </RouterLink>

            <div v-if="user" class="mt-8 flex flex-col items-center gap-4 opacity-0 animate-slide-up" style="animation-delay: 400ms">
                <button @click="goToAdmin" class="relative text-xl text-white font-bold flex items-center gap-2">
                    Panel Admin
                    <span v-if="pendingCount > 0" class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{{ pendingCount }} nuevos</span>
                </button>
                <button @click="handleLogout" class="text-sm text-red-400 uppercase tracking-widest">
                    Cerrar Sesión
                </button>
            </div>

            <div v-else class="mt-8 opacity-0 animate-slide-up" style="animation-delay: 400ms">
                <a href="https://wa.me/56912345678" class="px-8 py-3 bg-clinic-gold text-black font-bold uppercase tracking-widest rounded-full">
                    Agendar Cita
                </a>
                <p class="text-center mt-6 text-xs text-gray-500 cursor-pointer" @click="goToAdmin">Acceso Staff</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
/* Las mismas animaciones previas */
.mobile-menu-enter-active,
.mobile-menu-leave-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.mobile-menu-enter-from,
.mobile-menu-leave-to { opacity: 0; backdrop-filter: blur(0); }
.animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>