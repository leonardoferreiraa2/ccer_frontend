<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
    <div class="relative pb-[56.25%] bg-gray-100">
      <img 
        :src="sala.foto ? `/src/assets/${sala.foto}` : 'https://via.placeholder.com/500x300?text=CCER'" 
        :alt="sala.titulo"
        class="absolute inset-0 w-full h-full object-cover"
      >
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ sala.titulo }}</h3>
      <p class="text-sm text-gray-600 line-clamp-2 mb-3">{{ sala.descricao }}</p>
      <p class="text-xs text-gray-500 mb-4">Atualizado em: {{ sala.data_atualizacao }}</p>
      
      <div class="flex justify-between items-center">
        <div class="flex space-x-2">
          <button 
            @click="$emit('edit', sala)"
            class="p-2 text-blue-600 hover:text-blue-900 rounded hover:bg-blue-50 transition-colors"
            title="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            @click="$emit('delete', sala.id)"
            class="p-2 text-red-600 hover:text-red-900 rounded hover:bg-red-50 transition-colors"
            title="Excluir"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="flex space-x-2">
          <button 
            @click="$emit('preview', sala)"
            class="p-2 text-purple-600 hover:text-purple-900 rounded hover:bg-purple-50 transition-colors"
            title="Pré-visualizar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button 
            @click="$emit('download', sala)"
            class="p-2 text-green-600 hover:text-green-900 rounded hover:bg-green-50 transition-colors"
            title="Baixar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  sala: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete', 'download', 'preview'])
</script>