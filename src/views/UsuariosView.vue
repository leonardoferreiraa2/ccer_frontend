<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
          Gerenciamento de Usuários
        </h1>
        <p class="text-gray-600">Visualize e gerencie todos os usuários do sistema</p>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="openCreateModal" 
          class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <span>Novo Usuário</span>
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
          placeholder="Buscar por nome, e-mail ou perfil..."
          class="w-full px-3 py-2 border-0 focus:ring-0 focus:outline-none text-gray-700"
        >
      </div>
    </div>

    <!-- Tabela - Desktop -->
    <div class="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              E-mail
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Perfil
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.nome }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                user.tipo === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-cyan-100 text-cyan-800']">
                {{ user.tipo === 'admin' ? 'Administrador' : 'Editor' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                user.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                {{ user.ativo ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
              <button @click="openEditModal(user)" class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors" title="Editar">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button @click="openResetModal(user)" class="text-cyan-600 hover:text-cyan-900 p-1 rounded hover:bg-cyan-50 transition-colors" title="Resetar Senha">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
                </svg>
              </button>
              <button @click="openStatusModal(user)" :class="['p-1 rounded transition-colors', 
                user.ativo ? 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50' : 'text-green-600 hover:text-green-900 hover:bg-green-50']"
                :title="user.ativo ? 'Desativar' : 'Ativar'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button @click="openDeleteModal(user)" class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" title="Excluir">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Lista - Mobile -->
    <div class="md:hidden space-y-4">
      <div v-for="user in paginatedUsers" :key="user.id" class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div class="font-medium text-gray-900">{{ user.nome }}</div>
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </div>
          </div>
          <div class="flex space-x-1">
            <button @click="openEditModal(user)" class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors" title="Editar">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button @click="openDeleteModal(user)" class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" title="Excluir">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div class="flex space-x-2">
            <span :class="['inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', 
              user.tipo === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-cyan-100 text-cyan-800']">
              {{ user.tipo === 'admin' ? 'Admin' : 'Editor' }}
            </span>
            <span :class="['inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', 
              user.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
              {{ user.ativo ? 'Ativo' : 'Inativo' }}
            </span>
          </div>
          <div class="flex space-x-1">
            <button @click="openResetModal(user)" class="text-cyan-600 hover:text-cyan-900 p-1 rounded hover:bg-cyan-50 transition-colors" title="Resetar Senha">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
              </svg>
            </button>
            <button @click="openStatusModal(user)" :class="['p-1 rounded transition-colors', 
              user.ativo ? 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50' : 'text-green-600 hover:text-green-900 hover:bg-green-50']"
              :title="user.ativo ? 'Desativar' : 'Ativar'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-700">
        Mostrando <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span> a 
        <span class="font-medium">{{ Math.min(currentPage * perPage, filteredUsers.length) }}</span> de 
        <span class="font-medium">{{ filteredUsers.length }}</span> resultados
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
          :disabled="currentPage * perPage >= filteredUsers.length"
          :class="['px-3 py-1 rounded border', currentPage * perPage >= filteredUsers.length ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
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

    <!-- Modal de Cadastro/Edição -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div class="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span>{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</span>
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
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                Nome Completo
              </label>
              <input 
                v-model="form.nome" 
                type="text" 
                required 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                E-mail
              </label>
              <input 
                v-model="form.email" 
                type="email" 
                required 
                :disabled="isEditing"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Perfil
              </label>
              <select 
                v-model="form.tipo" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="admin">Administrador</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            <div v-if="isEditing">
              <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                Status
              </label>
              <select 
                v-model="form.ativo"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option :value="true">Ativo</option>
                <option :value="false">Inativo</option>
              </select>
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
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                {{ isLoading ? (isEditing ? 'Salvando...' : 'Cadastrando...') : (isEditing ? 'Salvar' : 'Cadastrar') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div class="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              :class="currentAction === 'delete' ? 'text-red-500' : 'text-blue-500'" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                v-if="currentAction === 'delete'"
                fill-rule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clip-rule="evenodd" 
              />
              <path 
                v-else
                fill-rule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" 
                clip-rule="evenodd" 
              />
            </svg>
            <span>{{ confirmTitle }}</span>
          </h2>
          <button @click="closeConfirmModal" class="text-gray-400 hover:text-gray-500 p-1">
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
            {{ confirmMessage }}
          </p>
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              @click="closeConfirmModal" 
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Cancelar
            </button>
            <button 
              @click="executeAction" 
              :disabled="isLoading"
              :class="['px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center',
                currentAction === 'delete' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500']"
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
                <path 
                  v-if="currentAction === 'delete'"
                  fill-rule="evenodd" 
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                  clip-rule="evenodd" 
                />
                <path 
                  v-else-if="currentAction === 'reset'"
                  fill-rule="evenodd" 
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" 
                  clip-rule="evenodd" 
                />
                <path 
                  v-else
                  fill-rule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clip-rule="evenodd" 
                />
              </svg>
              {{ isLoading ? 'Processando...' : confirmActionText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import Swal from 'sweetalert2'
import Menu from '../components/Menu.vue'

const router = useRouter()
const authStore = useAuthStore()

// Configuração do Toast
const toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

// Funções de notificação
const showSuccess = (message) => {
  toast.fire({
    icon: 'success',
    title: message,
    background: '#f0fdf4',
    iconColor: '#22c55e',
    color: '#166534'
  })
}

const showError = (message) => {
  toast.fire({
    icon: 'error',
    title: message,
    background: '#fef2f2',
    iconColor: '#ef4444',
    color: '#991b1b'
  })
}

// Dados dos usuários
const users = ref([
  { id: 1, nome: 'João Silva', email: 'joao@empresa.com', tipo: 'admin', ativo: true },
  { id: 2, nome: 'Maria Souza', email: 'maria@empresa.com', tipo: 'editor', ativo: true },
  { id: 3, nome: 'Carlos Oliveira', email: 'carlos@empresa.com', tipo: 'editor', ativo: false },
  { id: 4, nome: 'Ana Costa', email: 'ana@empresa.com', tipo: 'admin', ativo: true },
  { id: 5, nome: 'Pedro Santos', email: 'pedro@empresa.com', tipo: 'editor', ativo: true },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    nome: `Usuário ${i + 6}`,
    email: `user${i + 6}@empresa.com`,
    tipo: i % 3 === 0 ? 'admin' : 'editor',
    ativo: i % 4 !== 0
  }))
])

// Estados da UI
const showFormModal = ref(false)
const showConfirmModal = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)

// Formulário
const form = ref({
  id: null,
  nome: '',
  email: '',
  tipo: 'editor',
  ativo: true
})

// Confirmação
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmActionText = ref('')
const currentAction = ref('')
const currentUser = ref(null)

// Filtro e busca
const searchQuery = ref('')
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.nome.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.tipo.toLowerCase().includes(query) ||
    (user.ativo ? 'ativo' : 'inativo').includes(query)
  )
})

// Paginação
const currentPage = ref(1)
const perPage = ref(10)
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredUsers.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage.value))

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

// Funções de navegação
const navigateToSalas = () => {
  router.push('/salas')
}

// Funções de modal
const openCreateModal = () => {
  resetForm()
  isEditing.value = false
  showFormModal.value = true
}

const openEditModal = (user) => {
  form.value = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    tipo: user.tipo,
    ativo: user.ativo
  }
  isEditing.value = true
  showFormModal.value = true
}

const openDeleteModal = (user) => {
  currentUser.value = user
  currentAction.value = 'delete'
  confirmTitle.value = 'Confirmar Exclusão'
  confirmMessage.value = `Tem certeza que deseja excluir o usuário ${user.nome}? Esta ação não pode ser desfeita.`
  confirmActionText.value = 'Excluir'
  showConfirmModal.value = true
}

const openResetModal = (user) => {
  // Adicione esta linha para limpar o campo de busca
  searchQuery.value = ''
  
  currentUser.value = user
  currentAction.value = 'reset'
  confirmTitle.value = 'Redefinir Senha'
  confirmMessage.value = `Uma nova senha será enviada para o usuário ${user.nome}.`
  confirmActionText.value = 'Confirmar'
  showConfirmModal.value = true
}

const openStatusModal = (user) => {
  currentUser.value = user
  currentAction.value = user.ativo ? 'deactivate' : 'activate'
  confirmTitle.value = user.ativo ? 'Desativar Usuário' : 'Ativar Usuário'
  confirmMessage.value = user.ativo 
    ? `Deseja desativar o usuário ${user.nome}? Ele não poderá acessar o sistema até ser ativado novamente.` 
    : `Deseja ativar o usuário ${user.nome}? Ele terá acesso ao sistema novamente.`
  confirmActionText.value = user.ativo ? 'Desativar' : 'Ativar'
  showConfirmModal.value = true
}

const closeModal = () => {
  showFormModal.value = false
  resetForm()
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  currentUser.value = null
  currentAction.value = ''
}

const resetForm = () => {
  form.value = {
    id: null,
    nome: '',
    email: '',
    tipo: 'editor',
    ativo: true
  }
}

// Funções de ação
const submitForm = async () => {
  isLoading.value = true
  
  try {
    // Simulação de API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (isEditing.value) {
      const index = users.value.findIndex(u => u.id === form.value.id)
      if (index !== -1) {
        users.value[index] = { ...form.value }
      }
      showSuccess('Usuário atualizado com sucesso!')
    } else {
      const newId = Math.max(...users.value.map(u => u.id)) + 1
      users.value.unshift({
        id: newId,
        ...form.value
      })
      showSuccess('Usuário cadastrado com sucesso! Senha enviada por e-mail.')
    }
    
    closeModal()
  } catch (error) {
    showError('Erro ao salvar usuário')
    console.error("Erro ao salvar usuário:", error)
  } finally {
    isLoading.value = false
  }
}

const executeAction = async () => {
  isLoading.value = true
  
  try {
    // Simulação de API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    switch (currentAction.value) {
      case 'delete':
        users.value = users.value.filter(u => u.id !== currentUser.value.id)
        showSuccess('Usuário excluído com sucesso!')
        break
      case 'reset':
        showSuccess(`Senha resetada para ${currentUser.value.nome}! Nova senha enviada por e-mail.`)
        break
      case 'activate':
      case 'deactivate':
        const user = users.value.find(u => u.id === currentUser.value.id)
        if (user) {
          user.ativo = currentAction.value === 'activate'
        }
        showSuccess(`Usuário ${currentAction.value === 'activate' ? 'ativado' : 'desativado'} com sucesso!`)
        break
    }
    
    closeConfirmModal()
  } catch (error) {
    showError('Erro ao processar ação')
    console.error("Erro ao processar ação:", error)
  } finally {
    isLoading.value = false
  }
}
</script>