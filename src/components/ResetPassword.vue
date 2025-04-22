<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
    <div 
      class="bg-white rounded-lg shadow-xl w-full max-w-md"
      @keydown.enter.prevent="confirmarReset"
      @keydown.stop
    >
      <div class="flex justify-between items-center border-b border-gray-200 p-5">
        <h2 class="text-xl font-semibold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
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
import axios from '../../config/axios'
import Swal from 'sweetalert2'

const emit = defineEmits(['close', 'success'])

// Remove a prop user e pega o ID do usuário logado
const authStore = useAuthStore()
const userId = ref(null)

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
  
  // Obtém o ID do usuário logado
  if (authStore.user && authStore.user.id) {
    userId.value = authStore.user.id
  } else {
    erro.value = 'Usuário não identificado'
    console.error('Usuário não está logado ou não possui ID')
    return
  }

  if (senhaInput.value) {
    senhaInput.value.focus()
  }
})

const fecharModal = () => {
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
  
  if (!userId.value) {
    erro.value = 'Usuário não identificado'
    return
  }

  isLoading.value = true
  erro.value = ''

  try {
    const response = await axios.put(`/usuarios/${userId.value}`, { 
      senha: novaSenha.value 
    })

    if (response.data.success) {
      // Primeiro fechamos o modal
      fecharModal()
      
      // Depois mostramos a mensagem de sucesso
      await Swal.fire({
        icon: 'success',
        title: 'Senha alterada com sucesso!',
        showConfirmButton: false,
        timer: 2000,
        background: '#f0fdf4',
        iconColor: '#22c55e',
        color: '#166534',
        // Adicionando z-index alto para garantir que fique sobre outros elementos
        customClass: {
          container: 'z-[10000]'
        }
      })
      
      // Atualiza o usuário na store
      authStore.user = { ...authStore.user, senha: novaSenha.value }
      
      // Emite o evento de sucesso
      emit('success')
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || 
                   error.message || 
                   'Erro desconhecido ao alterar senha'
    
    erro.value = errorMsg
    console.error('Erro detalhado:', error)
    
    await Swal.fire({
      icon: 'error',
      title: 'Falha na operação',
      text: errorMsg,
      background: '#fef2f2',
      iconColor: '#ef4444',
      color: '#991b1b',
      customClass: {
        container: 'z-[10000]'
      }
    })
  } finally {
    isLoading.value = false
  }
}
</script>