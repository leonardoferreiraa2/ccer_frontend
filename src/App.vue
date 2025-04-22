<script setup>

import './styles/global.css'
import NavBar from './components/NavBar.vue'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()
authStore.initialize() // Isso configura o header Authorization se houver token
</script>

<template>
  <div id="app">
    <NavBar />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>