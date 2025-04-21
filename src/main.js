import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css' // Deve ser a PRIMEIRA importação CSS

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')