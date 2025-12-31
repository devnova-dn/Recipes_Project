<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="stick z-50 glassy top-0 border-b border-surface-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
              <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl md:text-2xl font-display font-bold text-gradient">{{ $t('app.title') }}</h1>
              <p class="text-xs text-surface-400">{{ $t('app.subtitle') }}</p>
            </div>
          </router-link>

          <!-- Navigation & Language Switcher -->
          <div class="flex items-center gap-4">
            <!-- Language Switcher -->
            <div class="relative">
              <button 
                @click="showLanguageMenu = !showLanguageMenu"
                class="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-800/50 hover:bg-surface-700/50 transition-all duration-300 border border-surface-700/50"
              >
                <svg class="w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
                <span class="text-sm text-surface-300 hidden sm:inline">{{ currentLanguageName }}</span>
                <svg class="w-4 h-4 text-surface-500 transition-transform duration-300" :class="{ 'rotate-180': showLanguageMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Language Dropdown -->
              <transition name="dropdown">
                <div 
                  v-if="showLanguageMenu"
                  class="absolute right-0 mt-2 w-40 bg-surface-800 border border-surface-700 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <button
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="changeLanguage(lang.code)"
                    :class="[
                      'w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200',
                      currentLocale === lang.code ? 'bg-primary-500/20 text-primary-300' : 'hover:bg-surface-700/50 text-surface-300'
                    ]"
                  >
                    <span class="text-lg">{{ lang.flag }}</span>
                    <span class="text-sm">{{ lang.name }}</span>
                  </button>
                </div>
              </transition>
            </div>

            <router-link 
              to="/" 
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              :class="$route.path === '/' ? 'bg-primary-500/20 text-primary-300' : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800'"
            >
              {{ $t('nav.discover') }}
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="border-t border-surface-800 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <span class="text-surface-400 text-sm">{{ $t('app.title') }} © 2024</span>
          </div>
          <p class="text-surface-500 text-sm">{{ $t('pantry.subtitle') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRecipeStore } from '@/stores/recipeStore'

const recipeStore = useRecipeStore()
const { locale } = useI18n()

const showLanguageMenu = ref(false)

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
]

const currentLocale = computed(() => locale.value)

const currentLanguageName = computed(() => {
  const lang = languages.find(l => l.code === currentLocale.value)
  return lang ? lang.name : 'English'
})

const changeLanguage = (code) => {
  locale.value = code
  localStorage.setItem('language', code)
  showLanguageMenu.value = false
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showLanguageMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  recipeStore.initializeRecipes()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
