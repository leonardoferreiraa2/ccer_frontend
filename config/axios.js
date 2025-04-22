import axios from 'axios'
import { useAuthStore } from '../src/stores/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Alterado para import.meta.env
  withCredentials: true,
  timeout: 30000 // 30 segundos
})

// Interceptor de requisição
api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Interceptor de resposta
api.interceptors.response.use(response => response, async error => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      if (authStore.token) { // Só faz logout se já estiver autenticado
        await authStore.logout()
      }
      window.location.href = '/login'
    }
    return Promise.reject(error)
  })

export default api