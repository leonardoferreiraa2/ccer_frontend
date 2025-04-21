<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
          Gerenciamento de Salas
        </h1>
        <p class="text-gray-600">Visualize e gerencie todas as salas do sistema</p>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="showModal = true" 
          class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span>Nova Sala</span>
        </button>
        <button 
          v-if="salas.length"
          @click="generateAllCards" 
          class="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          <span>Baixar Todas</span>
        </button>
        <Menu />
      </div>
    </div>

    <!-- Filtro -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Buscar por título ou descrição..."
          class="w-full px-3 py-2 border-0 focus:ring-0 focus:outline-none text-gray-700"
        >
      </div>
    </div>

    <!-- Listagem de Salas -->
    <div v-if="salas.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SalaCard 
        v-for="sala in filteredSalas" 
        :key="sala.id" 
        :sala="sala"
        @edit="handleEdit"
        @delete="handleDelete"
        @download="handleDownload"
        @preview="previewSalaImage"
      />
    </div>
    
    <!-- Estado Vazio -->
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <div class="max-w-md mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Nenhuma sala cadastrada</h3>
        <p class="mt-1 text-gray-600">Comece adicionando sua primeira sala de eventos</p>
        <button 
          @click="showModal = true" 
          class="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span>Adicionar Sala</span>
        </button>
      </div>
    </div>

    <!-- Paginação -->
    <div v-if="salas.length" class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-700">
        Mostrando <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span> a 
        <span class="font-medium">{{ Math.min(currentPage * perPage, filteredSalas.length) }}</span> de 
        <span class="font-medium">{{ filteredSalas.length }}</span> resultados
      </div>
      <div class="flex space-x-1">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          :class="['px-3 py-1 rounded border', currentPage === 1 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
        >
          Anterior
        </button>
        <button 
          v-for="page in visiblePages" 
          @click="currentPage = page"
          :key="page"
          :class="['px-3 py-1 rounded border', currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
        >
          {{ page }}
        </button>
        <button 
          @click="currentPage++" 
          :disabled="currentPage * perPage >= filteredSalas.length"
          :class="['px-3 py-1 rounded border', currentPage * perPage >= filteredSalas.length ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
        >
          Próxima
        </button>
      </div>
      <div class="flex items-center text-sm text-gray-700">
        <span class="mr-2">Itens por página:</span>
        <select 
          v-model="perPage" 
          @change="currentPage = 1"
          class="px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-sm w-full text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-700">Gerando imagem...</p>
      </div>
    </div>

    <!-- Modal de Pré-visualização -->
    <div v-if="showPreview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div class="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 class="text-xl font-semibold text-gray-800">Pré-visualização</h2>
          <button @click="showPreview = false" class="text-gray-400 hover:text-gray-500 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="p-5">
          <img :src="previewImage" alt="Pré-visualização da sala" class="w-full h-auto rounded-lg">
          <div class="mt-4 flex justify-center">
            <button 
              @click="downloadImage(previewImage, `sala-${salaDetail?.titulo?.toLowerCase().replace(/\s+/g, '-') || 'sala'}.jpg`)"  
              class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span>Baixar Imagem</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Edição/Criação -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div class="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span>{{ form.id ? 'Editar Sala' : 'Nova Sala' }}</span>
          </h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="p-5 space-y-4">
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                </svg>
                Título
              </label>
              <input 
                v-model="form.titulo" 
                type="text" 
                required 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                </svg>
                Descrição
              </label>
              <textarea 
                v-model="form.descricao" 
                required 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
                Foto *
              </label>
              <div class="mt-1 flex items-center">
                <label class="cursor-pointer">
                  <span class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                    Selecionar Imagem
                  </span>
                  <input 
                    type="file" 
                    accept="image/*"
                    @change="handleFileUpload" 
                    :required="!form.id && !form.fotoPreview"
                    class="sr-only"
                  >
                </label>
                <span v-if="form.foto || form.fotoPreview" class="ml-2 text-sm text-gray-500">
                  {{ form.foto?.name || 'Imagem selecionada' }}
                </span>
              </div>
              <div v-if="form.fotoPreview" class="mt-2">
                <img :src="form.fotoPreview" alt="Preview" class="h-32 w-auto rounded-lg">
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button" 
                @click="closeModal" 
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                Cancelar
              </button>
              <button 
                type="submit" 
                :disabled="isLoading"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 flex items-center"
              >
                <svg 
                  v-if="isLoading"
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg 
                  v-else 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 mr-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M7.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                {{ isLoading ? (form.id ? 'Salvando...' : 'Cadastrando...') : (form.id ? 'Salvar' : 'Cadastrar') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div class="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 class="text-xl font-semibold text-gray-800">{{ salaDetail?.titulo }}</h2>
          <button @click="showDetailModal = false" class="text-gray-400 hover:text-gray-500 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                :src="salaDetail?.foto ? `/src/assets/${salaDetail.foto}` : 'https://via.placeholder.com/500x300?text=CCER'" 
                :alt="salaDetail?.titulo"
                class="w-full h-auto rounded-lg"
              >
            </div>
            <div class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Descrição</h3>
                <p class="mt-1 text-gray-600">{{ salaDetail?.descricao }}</p>
              </div>
              
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">URL da Sala</h3>
                  <p class="mt-1">
                    <a :href="getSalaUrl(salaDetail?.id)" target="_blank" class="text-blue-600 hover:text-blue-800 break-all">
                      {{ getSalaUrl(salaDetail?.id) }}
                    </a>
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Última Atualização</h3>
                  <p class="mt-1 text-gray-600">{{ salaDetail?.data_atualizacao }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 px-5 py-4 flex justify-end space-x-3">
          <button 
            @click="handleEdit(salaDetail)"
            class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span>Editar Sala</span>
          </button>
          <button 
            @click="previewSalaImage(salaDetail)"
            class="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Pré-visualizar</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div class="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>Confirmar Exclusão</span>
          </h2>
          <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-500 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="p-5 space-y-4">
          <p class="text-gray-700 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Tem certeza que deseja excluir permanentemente a sala "{{ salaToDelete?.titulo }}"? Esta ação não pode ser desfeita!
          </p>
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              @click="showDeleteModal = false" 
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Cancelar
            </button>
            <button 
              @click="confirmDelete" 
              :disabled="isLoading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 flex items-center"
            >
              <svg 
                v-if="isLoading"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg 
                v-else 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 mr-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ isLoading ? 'Excluindo...' : 'Confirmar Exclusão' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import SalaCard from '../components/SalaCard.vue'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useRouter } from 'vue-router'
import { useAlert } from '../composables/useAlert'
import Menu from '../components/Menu.vue'

const router = useRouter()
const { showSuccess, showError } = useAlert()

// Dados das salas
const salas = ref([
  {
    id: 1,
    titulo: 'Sala de Música',
    descricao: 'Sala completa com piano de cauda, bateria e equipamento de som profissional',
    foto: 'sala-musica.jpg',
    data_atualizacao: '15/01/2024'
  },
  {
    id: 2,
    titulo: 'Sala de Dança',
    descricao: 'Espaço amplo com piso especializado, espelhos e barras',
    foto: 'sala-danca.jpg',
    data_atualizacao: '10/01/2024'
  },
  {
    id: 3,
    titulo: 'Sala de Teatro',
    descricao: 'Palco profissional com iluminação cênica e cortinas',
    foto: 'sala-teatro.jpg',
    data_atualizacao: '05/01/2024'
  }
])

// Estados da UI
const showModal = ref(false)
const showDeleteModal = ref(false)
const showDetailModal = ref(false)
const showPreview = ref(false)
const isLoading = ref(false)
const salaToDelete = ref(null)
const salaDetail = ref(null)
const previewImage = ref('')

// Formulário
const form = ref({
  id: null,
  titulo: '',
  descricao: '',
  foto: null,
  fotoPreview: null
})

// Filtro e busca
const searchQuery = ref('')
const filteredSalas = computed(() => {
  if (!searchQuery.value) return salas.value
  const query = searchQuery.value.toLowerCase()
  return salas.value.filter(sala => 
    sala.titulo.toLowerCase().includes(query) ||
    sala.descricao.toLowerCase().includes(query)
  )
})

// Paginação
const currentPage = ref(1)
const perPage = ref(10)
const paginatedSalas = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredSalas.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredSalas.value.length / perPage.value))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Resetar página quando filtrar ou mudar itens por página
watch([searchQuery, perPage], () => {
  currentPage.value = 1
})

// Função para gerar URL da sala
const getSalaUrl = (id) => {
  return `http://localhost:5173/sala/${id}`
}

// Manipulação de arquivos
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.foto = file
    const reader = new FileReader()
    reader.onload = (event) => {
      form.value.fotoPreview = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Operações CRUD
const handleEdit = (sala) => {
  form.value = { 
    ...sala,
    fotoPreview: sala.foto ? `/src/assets/${sala.foto}` : null
  }
  showModal.value = true
}

const handleDelete = (id) => {
  salaToDelete.value = salas.value.find(sala => sala.id === id)
  showDeleteModal.value = true
}

const showDetails = (sala) => {
  salaDetail.value = sala
  showDetailModal.value = true
}

const confirmDelete = async () => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    salas.value = salas.value.filter(sala => sala.id !== salaToDelete.value.id)
    showDeleteModal.value = false
    salaToDelete.value = null
    showSuccess('Sala excluída com sucesso!')
  } catch (error) {
    showError('Erro ao excluir sala')
    console.error("Erro ao excluir sala:", error)
  } finally {
    isLoading.value = false
  }
}

const submitForm = async () => {
  isLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (form.value.id) {
      const index = salas.value.findIndex(s => s.id === form.value.id)
      salas.value[index] = { 
        ...form.value,
        foto: form.value.foto?.name || form.value.foto,
        data_atualizacao: new Date().toLocaleDateString('pt-BR')
      }
      showSuccess('Sala atualizada com sucesso!')
    } else {
      const novaSala = {
        ...form.value,
        id: Math.max(...salas.value.map(s => s.id)) + 1,
        data_atualizacao: new Date().toLocaleDateString('pt-BR'),
        foto: form.value.foto?.name || 'default.jpg'
      }
      salas.value.unshift(novaSala)
      showSuccess('Sala cadastrada com sucesso!')
    }
    
    closeModal()
  } catch (error) {
    showError('Erro ao salvar sala')
    console.error("Erro ao salvar sala:", error)
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  showDetailModal.value = false
  form.value = { 
    id: null, 
    titulo: '', 
    descricao: '', 
    foto: null,
    fotoPreview: null
  }
}

// Funções para geração de imagem
const loadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.crossOrigin = 'Anonymous'
  })
}

const generateQRCode = async (sala) => {
  const qrCanvas = document.createElement('canvas')
  await QRCode.toCanvas(qrCanvas, getSalaUrl(sala.id), {
    width: 500,
    margin: 2,
    color: { dark: '#2c3e50', light: '#ffffff00' }
  })
  return qrCanvas
}

const wrapText = (ctx, text, maxWidth, fontSize) => {
  const lines = []
  const words = text.split(' ')
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = ctx.measureText(currentLine + ' ' + word).width
    if (width < maxWidth) {
      currentLine += ' ' + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)
  return lines
}

const addTextElements = (ctx, sala, dimensions) => {
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillStyle = '#2c3e50'
  
  // Título
  ctx.font = 'bold 60px Arial'
  const titleLines = wrapText(ctx, sala.titulo, dimensions.canvasWidth - 150, 60)
  let currentY = dimensions.titleY
  
  titleLines.forEach(line => {
    ctx.fillText(line, dimensions.canvasWidth / 2, currentY)
    currentY += 70
  })
}

const generateSalaImage = async (sala, triggerDownload = true) => {
  isLoading.value = true
  try {
    // 1. Carregar template
    const templateImg = await loadImage('/modelo_qr.png')
    
    // 2. Configurar canvas
    const canvas = document.createElement('canvas')
    canvas.width = templateImg.width
    canvas.height = templateImg.height
    const ctx = canvas.getContext('2d')

    // 3. Desenhar template
    ctx.drawImage(templateImg, 0, 0)

    // 4. Configurações de posição
    const qrSize = 500
    const qrX = 340
    const qrY = 475
    const titleY = qrY - 170

    // 5. Gerar QR Code
    const qrCanvas = await generateQRCode(sala)
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize)

    // 6. Adicionar textos
    addTextElements(ctx, sala, {
      canvasWidth: canvas.width,
      qrY,
      titleY,
      qrSize
    })

    // 7. Gerar imagem final
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
    
    if (triggerDownload) {
      downloadImage(dataUrl, `sala-${sala.titulo.toLowerCase().replace(/\s+/g, '-')}.jpg`)
      showSuccess('Imagem da sala gerada com sucesso!')
    } else {
      return dataUrl
    }

  } catch (error) {
    showError('Erro ao gerar imagem da sala')
    console.error('Erro ao gerar imagem:', error)
  } finally {
    isLoading.value = false
  }
}

const downloadImage = (dataUrl, filename) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Novas funcionalidades
const previewSalaImage = async (sala) => {
  salaDetail.value = sala
  const dataUrl = await generateSalaImage(sala, false)
  previewImage.value = dataUrl
  showPreview.value = true
}

const generateAllCards = async () => {
  isLoading.value = true
  try {
    const zip = new JSZip()
    
    for (const sala of salas.value) {
      const dataUrl = await generateSalaImage(sala, false)
      const base64Data = dataUrl.split(',')[1]
      zip.file(`sala-${sala.id}-${sala.titulo.toLowerCase().replace(/\s+/g, '-')}.jpg`, base64Data, {base64: true})
    }
    
    const content = await zip.generateAsync({type: 'blob'})
    saveAs(content, 'todas-salas.zip')
    showSuccess('Todas as imagens foram baixadas em um arquivo ZIP!')
    
  } catch (error) {
    showError('Erro ao gerar arquivo ZIP')
    console.error('Erro ao gerar arquivo ZIP:', error)
  } finally {
    isLoading.value = false
  }
}

const handleDownload = (sala) => {
  generateSalaImage(sala)
}

const navigateToUsuarios = () => {
  router.push('/usuarios')
}
</script>