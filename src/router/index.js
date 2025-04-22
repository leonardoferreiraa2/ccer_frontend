// C:\Temp\ccer\frontend\src\router\index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  { 
    path: '/', 
    redirect: '/salas' 
  },
  { 
    path: '/login', 
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  { 
    path: '/salas', 
    component: () => import('../views/SalasView.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/usuarios', 
    component: () => import('../views/UsuariosView.vue'),
    meta: { 
      requiresAuth: true,
      requiresAdmin: true 
    }
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
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/salas')
  } else if (to.meta.requiresAdmin && (!authStore.isAuthenticated || !authStore.isAdmin)) {
    next('/salas')
  } else {
    next()
  }
})

export default router