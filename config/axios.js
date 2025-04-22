import axios from 'axios'
import { useAuthStore } from '../src/stores/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000
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
api.interceptors.response.use(response => {
  return response
}, error => {
  // Você pode adicionar tratamento específico para diferentes códigos de erro aqui
  // Mas removemos o logout automático para 401
  return Promise.reject(error)
})

export default api