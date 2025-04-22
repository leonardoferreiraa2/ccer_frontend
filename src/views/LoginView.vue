<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-[#121C3A] mb-2">
          CCER - Login
        </h1>
      </div>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <transition
          enter-active-class="transition-opacity duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-500"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div 
            v-if="authStore.shouldShowLoginError" 
            class="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg mb-4 border border-red-200"
          >
            {{ authStore.loginError.message }}
          </div>
        </transition>
        
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <input 
              v-model="form.email" 
              placeholder="Email" 
              required 
              type="email"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              @focus="authStore.clearLoginError"
            >
          </div>
          <div>
            <input 
              v-model="form.senha" 
              type="password" 
              placeholder="Senha" 
              required 
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              @focus="authStore.clearLoginError"
            >
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="authStore.isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="!authStore.isLoading">Entrar</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({ username: '', password: '' })

onMounted(() => {
  authStore.clearLoginError()
})

const handleLogin = async () => {
  const success = await authStore.login(form.value)
  
  if (success) {
    try {
      await router.push('/salas')
    } catch (error) {
      window.location.href = '/salas'
    }
  }
}
</script>