import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nosotros',
      name: 'about',
      component: () => import('../views/AboutView.vue') // Lazy loading
    },
    {
      path: '/servicios',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    // --- NUEVA RUTA AGREGADA ---
    {
      path: '/informacion',
      name: 'information',
      // Asegúrate de que el archivo esté en src/views/InformationView.vue
      component: () => import('../views/InformationView.vue') 
    }
  ],
  // Comportamiento de scroll "suave" al cambiar de página
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router