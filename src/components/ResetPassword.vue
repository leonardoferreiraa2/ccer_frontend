<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div 
        class="bg-white rounded-lg shadow-xl w-full max-w-md"
        @keydown.enter.prevent="confirmarReset"
        @keydown.stop
      >
        <div class="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center">
            <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Redefinir Senha
          </h2>
          <button 
            @click="fecharModal" 
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Fechar modal"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-5 space-y-4">
          <div>
            <label for="novaSenha" class="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
            <div class="relative">
              <input
                id="novaSenha"
                v-model="novaSenha"
                :type="showPassword ? 'text' : 'password'"
                required
                ref="senhaInput"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="Digite a nova senha"
                autocomplete="new-password"
                @keydown.stop
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                @click="showPassword = !showPassword"
                aria-label="Mostrar senha"
              >
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <label for="confirmacaoSenha" class="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
            <div class="relative">
              <input
                id="confirmacaoSenha"
                v-model="confirmacaoSenha"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="Confirme a nova senha"
                autocomplete="new-password"
                @keydown.stop
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                @click="showConfirmPassword = !showConfirmPassword"
                aria-label="Mostrar senha"
              >
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
          
          <p v-if="erro" class="text-sm text-red-600">{{ erro }}</p>
        </div>
        
        <div class="bg-gray-50 px-5 py-4 flex justify-end space-x-3">
          <button 
            @click="fecharModal"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button 
            @click="confirmarReset"
            :disabled="isLoading"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <span v-if="!isLoading">Confirmar</span>
            <svg v-else class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import { useAuthStore } from '../stores/authStore'
  import { useRouter } from 'vue-router'
  import Swal from 'sweetalert2'
  
  const emit = defineEmits(['close'])
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const novaSenha = ref('')
  const confirmacaoSenha = ref('')
  const erro = ref('')
  const isLoading = ref(false)
  const senhaInput = ref(null)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  
  onMounted(async () => {
    await nextTick()
    document.body.style.overflow = 'hidden'
    senhaInput.value.focus()
    document.addEventListener('focusin', trapFocus)
  })
  
  const trapFocus = (e) => {
    const modalContent = document.querySelector('.bg-white.rounded-lg')
    if (modalContent && !modalContent.contains(e.target)) {
      e.preventDefault()
      senhaInput.value.focus()
    }
  }
  
  const fecharModal = () => {
    document.removeEventListener('focusin', trapFocus)
    document.body.style.overflow = ''
    emit('close')
  }
  
  const validarSenha = () => {
    if (novaSenha.value.length < 6) {
      erro.value = 'A senha deve ter pelo menos 6 caracteres'
      return false
    }
    
    if (novaSenha.value !== confirmacaoSenha.value) {
      erro.value = 'As senhas não coincidem'
      return false
    }
    
    erro.value = ''
    return true
  }
  
  const confirmarReset = async () => {
    if (!validarSenha()) return
    
    isLoading.value = true
    
    try {
        // Simulação de chamada à API para alterar a senha
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Configura o SweetAlert2 para aparecer na frente do modal
        const swalInstance = Swal.mixin({
        customClass: {
            container: 'z-[99999]' // Z-index maior que o do modal
        }
        })
        
        // Mostra a mensagem de sucesso
        await swalInstance.fire({
        icon: 'success',
        title: 'Senha alterada com sucesso!',
        text: 'Fazendo login automaticamente...',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#f0fdf4',
        iconColor: '#22c55e',
        color: '#166534',
        didClose: async () => {
            fecharModal()
            const userEmail = authStore.user.email
            await authStore.logout()
            await authStore.login({
            email: userEmail,
            password: novaSenha.value
            })
        }
        })
        
    } catch (error) {
        isLoading.value = false
        Swal.fire({
        icon: 'error',
        title: 'Falha ao resetar senha',
        text: error.message || 'Ocorreu um erro ao tentar alterar a senha.',
        background: '#fef2f2',
        iconColor: '#ef4444',
        color: '#991b1b',
        customClass: {
            container: 'z-[99999]' // Também aplica para mensagens de erro
        }
        })
    }
  }
</script>