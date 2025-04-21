import { defineStore } from 'pinia'
import axios from '../../config/axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAdmin: false,
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
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            email: credentials.username,
            senha: credentials.password
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        )

        if (!response.data.success) {
          throw new Error(response.data.message || 'Login falhou')
        }

        this.user = response.data.usuario
        this.token = response.data.token
        this.isAdmin = this.user?.perfil === 'Administrador'
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return true
        
      } catch (error) {
        this.setLoginError(error)
        return false
      } finally {
        this.isLoading = false
      }
    },

    setLoginError(error) {
      let message = 'Erro durante o login'
      
      if (error.code === 'ECONNABORTED') {
        message = 'Tempo de conexão esgotado'
      } else if (!error.response) {
        message = 'Servidor não disponível. Verifique sua conexão.'
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
        // Garante que temos um token válido antes de tentar logout
        if (!this.token) {
          throw new Error('Nenhum token disponível');
        }
    
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/logout`, 
          {}, 
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          }
        );
    
        this.resetAuthState();
        return response.data;
      } catch (error) {
        // Mesmo se falhar no servidor, limpa o estado local
        this.resetAuthState();
        throw error;
      }
    },
    
    resetAuthState() {
      this.user = null;
      this.token = null;
      this.isAdmin = false;
      this.loginError = null;
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    shouldShowLoginError: (state) => {
      return state.loginError && state.loginError.timestamp === state.lastLoginAttempt
    }
  },

  persist: true
})