<!-- C:\Temp\ccer\frontend\src\components\Menu.vue -->
<template>
  <div class="relative">
    <!-- Botão Hamburguer -->
    <button 
      @click.stop="toggleMenu"
      class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Menu de navegação"
    >
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Overlay -->
    <div 
      v-if="isOpen"
      @click="closeMenu"
      class="fixed inset-0 z-20 bg-black bg-opacity-50"
    ></div>

    <!-- Menu Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-if="isOpen"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30"
      >
        <div class="py-1">
          <!-- Gerenciar Salas -->
          <router-link
            to="/salas"
            class="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
            :class="{
              'text-blue-600 bg-blue-50': isActive('/salas'),
              'text-gray-700 hover:text-gray-900': !isActive('/salas')
            }"
            @click="closeMenu"
          >
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Gerenciar Salas
          </router-link>

          <!-- Gerenciar Usuários - Mostrar apenas para administradores -->
          <router-link
            v-if="authStore.isAdmin"
            to="/usuarios"
            class="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
            :class="{
              'text-blue-600 bg-blue-50': isActive('/usuarios'),
              'text-gray-700 hover:text-gray-900': !isActive('/usuarios')
            }"
            @click="closeMenu"
          >
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Gerenciar Usuários
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const route = useRoute()
const isOpen = ref(false)

const isActive = (path) => {
  return route.path === path
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>