import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  { 
    path: '/', 
    redirect: '/salas' 
  },
  { 
    path: '/login', 
    component: () => import('../views/LoginView.vue') 
  },
  { 
    path: '/salas', 
    component: () => import('../views/SalasView.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/usuarios', 
    component: () => import('../views/UsuariosView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/sala/:id',
    component: () => import('../views/SalaPublica.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router