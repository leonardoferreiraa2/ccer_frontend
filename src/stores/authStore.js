import { defineStore } from 'pinia'
import axios from '../../config/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAdmin: localStorage.getItem('isAdmin') === 'true' || false,
    loginError: null,
    isLoading: false,
    lastLoginAttempt: null
  }),

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.loginError = null
      this.lastLoginAttempt = new Date().toISOString()
      
      try {
        const response = await axios.post('/auth/login',
          {
            email: credentials.email,
            senha: credentials.senha
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (!response.data.success) {
          throw new Error(response.data.message || 'Login falhou')
        }

        this.setAuthData(response.data.usuario, response.data.token)
        return true
        
      } catch (error) {
        this.setLoginError(error)
        return false
      } finally {
        this.isLoading = false
      }
    },

    setAuthData(user, token) {
      this.user = user
      this.token = token
      this.isAdmin = user?.perfil === 'Administrador'
      
      // Armazena no localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      localStorage.setItem('isAdmin', this.isAdmin)
      
      // Configura o header Authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },

    setLoginError(error) {
      let message = 'Erro durante o login'
      
      if (error.code === 'ECONNABORTED') {
        message = 'Tempo de conexão esgotado'
      } else if (!error.response) {
        if (error.message && error.message.includes('Network Error')) {
          message = 'Servidor não disponível. Verifique sua conexão.'
        } else {
          message = error.message || 'Erro desconhecido'
        }
      } else if (error.response.data?.code === 'CREDENCIAIS_INVALIDAS') {
        message = 'Email ou senha incorretos'
      } else if (error.response.data?.message) {
        message = error.response.data.message
      }
      
      this.loginError = {
        message,
        timestamp: this.lastLoginAttempt
      }
    },

    clearLoginError() {
      this.loginError = null
    },

    async logout() {
      try {
        if (this.token) {
          await axios.post('/auth/logout', 
            {}, 
            {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
              }
            }
          )
        }
      } catch (error) {
        console.error('Erro durante logout:', error)
      } finally {
        this.resetAuthState()
      }
    },
    
    resetAuthState() {
      this.user = null
      this.token = null
      this.isAdmin = false
      this.loginError = null
      delete axios.defaults.headers.common['Authorization']
      
      // Remove do localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('isAdmin')
    },

    initialize() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    shouldShowLoginError: (state) => {
      return state.loginError && state.loginError.timestamp === state.lastLoginAttempt
    }
  }
})