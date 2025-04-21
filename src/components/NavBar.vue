<template>
  <div>
    <!-- Espaço reservado para quando o nav estiver fixo -->
    <div :class="{'h-24': scrolled}" class="transition-all duration-300"></div>
    
    <nav :class="['shadow-2xl transition-all duration-300 z-50', scrolled ? 'fixed top-0 left-0 right-0 bg-[#121C3A]' : 'relative bg-[#121C3A]']">
      <div class="max-w-8xl mx-auto px-5">
        <div class="flex justify-between items-center h-24">
          
          <!-- Logo e Título -->
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

          <!-- Botão Sair -->
          <div v-if="authStore.isAuthenticated">
            <button 
              @click="handleLogout" 
              class="group flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#121C3A] font-semibold transition-all duration-250 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm tracking-wide">SAIR</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const scrolled = ref(false)

const handleScroll = () => {
  // Usando requestAnimationFrame para melhor performance
  requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 10
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>