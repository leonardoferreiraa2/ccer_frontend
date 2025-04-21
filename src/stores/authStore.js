import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAdmin: false
  }),
  actions: {
    async login(credentials) {
      // Simulação de login
      this.user = { username: credentials.username, admin: true }
      this.isAdmin = true
      return Promise.resolve()
    },
    logout() {
      this.user = null
      this.isAdmin = false
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user
  }
})