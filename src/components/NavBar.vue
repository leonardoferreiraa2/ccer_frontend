<!-- C:\Temp\ccer\frontend\src\components\NavBar.vue -->
<template>
  <div>
    <div v-if="errorMessage" class="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50">
      {{ errorMessage }}
    </div>
    <div :class="{'h-24': scrolled}" class="transition-all duration-300"></div>
    
    <nav :class="['shadow-2xl transition-all duration-300 z-50', scrolled ? 'fixed top-0 left-0 right-0 bg-[#121C3A]' : 'relative bg-[#121C3A]']">
      <div class="max-w-8xl mx-auto px-5">
        <div class="flex justify-between items-center h-24">
          
          <div class="flex items-center space-x-5">
            <img src="/logo_ccer.avif" alt="Logo CCER" 
                 class="h-16 w-auto transform hover:scale-[1.02] transition-all duration-250">
            
            <div>
              <h1 class="text-2xl font-bold tracking-tight">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-100 to-white">
                  Centro Cultural
                </span>
              </h1>
              <p class="text-blue-100 text-lg font-light mt-1 tracking-wider">
                Eliziário Rangel
              </p>
            </div>
          </div>

          <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
            <div class="relative">
              <button 
                @click.stop="toggleDropdown"
                class="flex items-center focus:outline-none"
                aria-label="Menu do usuário"
              >
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                      {{ userInitials }}
                    </div>
                    <div class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#121C3A] bg-green-400"></div>
                  </div>
                  
                  <div class="hidden md:block">
                    <p class="text-sm font-medium text-white leading-tight">{{ authStore.user.nome }}</p>
                    <p class="text-xs text-blue-200 font-light capitalize">{{ authStore.user.perfil.toLowerCase() }}</p>
                  </div>
                </div>
              </button>
              
              <div 
                v-if="dropdownOpen"
                ref="dropdownMenu"
                class="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <div class="px-4 py-2 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-800">{{ authStore.user.nome }}</p>
                  <p class="text-xs text-gray-500">{{ authStore.user.email }}</p>
                </div>
                
                <!-- Reset Password Option -->
                <button 
                  @click.stop="openResetPasswordModal"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                  <span>Alterar Senha</span>
                </button>
                
                <button 
                  @click="handleLogout" 
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-2"
                  :disabled="loading"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ loading ? 'Saindo...' : 'Sair' }}</span>
                </button>
              </div>
            </div>
            
            <button 
              @click="handleLogout" 
              :disabled="loading"
              class="md:hidden group flex items-center space-x-2 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-[#121C3A] font-semibold transition-all duration-250 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm tracking-wide hidden sm:inline">
                {{ loading ? 'SAINDO...' : 'SAIR' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Modal de Reset de Senha -->
    <ResetPasswordModal 
      v-if="showResetModal"
      @close="closeResetModal"
    />
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ResetPasswordModal from './ResetPassword.vue'

const authStore = useAuthStore()
const router = useRouter()
const scrolled = ref(false)
const loading = ref(false)
const errorMessage = ref(null)
const dropdownOpen = ref(false)
const dropdownMenu = ref(null)
const showResetModal = ref(false)

const userInitials = computed(() => {
  if (!authStore.user?.nome) return '?'
  const names = authStore.user.nome.split(' ')
  return names.length >= 2 
    ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    : names[0][0].toUpperCase()
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const openResetPasswordModal = () => {
  dropdownOpen.value = false
  showResetModal.value = true
}

const closeResetModal = () => {
  showResetModal.value = false
}

const handleClickOutside = (event) => {
  if (dropdownMenu.value && !dropdownMenu.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

const handleScroll = () => {
  requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 10
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})

const handleLogout = async () => {
  loading.value = true
  errorMessage.value = null
  
  try {
    await authStore.logout()
    router.push('/login').then(() => {
      window.location.reload()
    })
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    errorMessage.value = 'Erro ao sair. Tente novamente.'
  } finally {
    loading.value = false
    dropdownOpen.value = false
  }
}
</script>