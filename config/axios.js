import axios from 'axios'
import { useAuthStore } from '../src/stores/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000
})

api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  return response
}, async error => {
  if (error.response?.status === 401) {
    const authStore = useAuthStore()
    if (authStore.isAuthenticated) {
      await authStore.logout()
    }
  }
  return Promise.reject(error)
})

export default api