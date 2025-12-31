import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from './i18n'
import App from './App.vue'
import './style.css'

// Import views
import Home from './views/Home.vue'
import RecipeDetailPage from './views/RecipeDetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: RecipeDetailPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
