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
    {
      path: '/informacion',
      name: 'information',
      component: () => import('../views/InformationView.vue') 
    },
    // --- NUEVA RUTA: DASHBOARD ADMINISTRATIVO ---
    {
      path: '/admin',
      name: 'admin',
      // Se carga solo cuando entras a /admin para ahorrar recursos
      component: () => import('../views/DashboardView.vue') 
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