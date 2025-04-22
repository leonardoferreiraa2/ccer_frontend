<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Logo no canto superior direito -->
      <div class="flex justify-end mb-4">
        <img src="/logo_ccer.avif" alt="Logo CCER" class="h-10 md:h-12">
      </div>

      <!-- Card principal -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Foto da sala (acima de tudo) -->
        <div class="w-full h-64 md:h-80 overflow-hidden">
          <img 
            :src="getImageUrl(sala.foto)" 
            :alt="sala.titulo"
            class="w-full h-full object-cover"
            @error="handleImageError"
            crossorigin="anonymous"
            v-if="!loading"
          >
          <div v-else class="w-full h-full bg-gray-200 animate-pulse"></div>
        </div>

        <!-- Conteúdo abaixo da foto -->
        <div class="p-6 md:p-8">
          <!-- Loading state -->
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-3 text-gray-600">Carregando sala...</p>
          </div>

          <!-- Conteúdo carregado -->
          <div v-else>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{{ sala.titulo }}</h1>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-6">
              <p class="text-gray-700">{{ sala.descricao }}</p>
            </div>

            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span class="text-sm text-gray-500">
                Atualizado em: {{ formatDate(sala.updated_at) || 'N/A' }}
              </span>
              
              <button @click="speakText(sala.descricao)" 
                class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Rodapé com links sociais -->
      <div class="mt-8 text-center">
        <div class="flex justify-center space-x-4 mb-4">
          <a href="https://maps.google.com/?cid=11476598513147453749" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/eliziariorangel/#" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/eliziariorangel" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCRzKAGzFNOsK7sS7X-Qz2EQ" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>
          <a href="https://x.com/i/flow/login?redirect_after_login=%2Feliziariorangel" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/elizi%C3%A1rio-rangel/?originalSubdomain=br" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
        
        <p class="text-sm text-gray-500">
          ©{{ currentYear }} Copyright - Centro Cultural Elizidrio Rangel. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../../config/axios'

const route = useRoute()
const sala = ref({
  titulo: '',
  descricao: '',
  foto: null,
  updatedAt: null
})
const loading = ref(true)
const currentYear = ref(new Date().getFullYear())

const fetchSala = async (id) => {
  try {
    loading.value = true
    const response = await axios.get(`/salas/${id}`)
    
    if (response.data.success) {
      sala.value = response.data.data
    } else {
      console.error('Sala não encontrada')
    }
  } catch (error) {
    console.error('Erro ao buscar sala:', error)
  } finally {
    loading.value = false
  }
}

// Adicionando um watcher para detectar quando a sala é carregada
watch(() => sala.value.descricao, (newDesc) => {
  if (newDesc) {
    // Usar setTimeout para garantir que a fala ocorra após a renderização
    setTimeout(() => {
      speakText(newDesc)
    }, 500)
  }
})

const placeholderImage = 'https://via.placeholder.com/500x300?text=CCER'

const getImageUrl = (foto) => {
  if (!foto) return placeholderImage;
  return `${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${foto}?t=${Date.now()}`;
};

const handleImageError = (event) => {
  console.error('Erro ao carregar imagem:', event.target.src);
  event.target.src = placeholderImage;
  event.target.onerror = null; // Previne loop de erro
}

const speakText = (text) => {
  // Verificar se a API de síntese de fala está disponível
  if (!('speechSynthesis' in window)) {
    console.warn('Seu navegador não suporta a API de síntese de fala')
    return
  }
  
  const synth = window.speechSynthesis
  // Cancelar qualquer fala em andamento
  synth.cancel()
  
  if (synth && text) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    // Configurar voz (opcional)
    const voices = synth.getVoices()
    const portugueseVoice = voices.find(voice => 
      voice.lang.includes('pt') || voice.lang.includes('PT')
    )
    if (portugueseVoice) {
      utterance.voice = portugueseVoice
    }
    synth.speak(utterance)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

onMounted(() => {
  const salaId = route.params.id
  if (salaId) {
    fetchSala(salaId)
  } else {
    loading.value = false
  }
  
  // Alguns navegadores precisam que as vozes sejam carregadas
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      // Vozes carregadas
    }
  }
})
</script>