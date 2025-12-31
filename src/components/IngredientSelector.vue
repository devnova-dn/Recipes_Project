<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h2 class="text-2xl md:text-3xl font-display font-bold text-gradient mb-2">{{ $t('pantry.title') }}</h2>
      <p class="text-surface-400 text-sm">{{ $t('pantry.subtitle') }}</p>
    </div>

    <!-- Search Input -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('pantry.searchPlaceholder')"
        class="input-field pl-12"
        @focus="showDropdown = true"
        @blur="handleBlur"
      >
      <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>

      <!-- Dropdown -->
      <transition name="fade">
        <div 
          v-if="showDropdown && filteredAvailableIngredients.length > 0"
          class="absolute z-50 w-full mt-2 bg-surface-800 border border-surface-700 rounded-xl shadow-xl max-h-60 overflow-y-auto"
        >
          <button
            v-for="ingredient in filteredAvailableIngredients"
            :key="ingredient"
            class="w-full px-4 py-3 text-left hover:bg-surface-700 transition-colors duration-200 flex items-center gap-3"
            @click="selectIngredient(ingredient)"
          >
            <div class="w-6 h-6 rounded border-2 border-surface-600 flex items-center justify-center">
              <svg class="w-4 h-4 text-primary-400 opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span class="text-surface-200 capitalize">{{ ingredient }}</span>
          </button>
        </div>
      </transition>
    </div>

    <!-- Selected Ingredients -->
    <div v-if="selectedIngredients.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-surface-200">
          {{ $t('pantry.selected') }} <span class="text-primary-400">{{ selectedIngredients.length }}</span> {{ $t('pantry.ingredients') }}
        </h3>
        <button
          @click="clearPantry"
          class="text-sm text-surface-400 hover:text-pink-400 transition-colors duration-200"
        >
          {{ $t('pantry.clearAll') }}
        </button>
      </div>
      
      <div class="flex flex-wrap gap-2">
        <transition-group name="list">
          <button
            v-for="ingredient in selectedIngredients"
            :key="ingredient"
            @click="toggleIngredient(ingredient)"
            class="ingredient-tag-selected group"
          >
            <span class="capitalize">{{ ingredient }}</span>
            <svg class="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </transition-group>
      </div>
    </div>

    <!-- Quick Add Categories -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-surface-200">{{ $t('pantry.quickAdd') }}</h3>
      
      <!-- Categories Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <button
          v-for="category in quickAddCategories"
          :key="category.name"
          @click="addCategory(category.ingredients)"
          class="p-3 bg-surface-800/50 hover:bg-surface-700/50 rounded-xl border border-surface-700/50 hover:border-primary-500/30 transition-all duration-300 text-left group"
        >
          <div class="text-2xl mb-1">{{ category.icon }}</div>
          <div class="text-sm text-surface-300 group-hover:text-primary-200 transition-colors">{{ category.name }}</div>
          <div class="text-xs text-surface-500 mt-1">{{ category.count }} {{ $t('pantry.ingredients') }}</div>
        </button>
      </div>
    </div>

    <!-- Common Ingredients -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-surface-200">{{ $t('pantry.commonIngredients') }}</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="ingredient in commonIngredients"
          :key="ingredient"
          @click="toggleIngredient(ingredient)"
          :class="[
            'ingredient-tag transition-all duration-300',
            selectedIngredients.includes(ingredient) ? 'bg-primary-500/20 border-primary-500/50 text-primary-200' : ''
          ]"
        >
          <span class="capitalize">{{ ingredient }}</span>
          <svg 
            v-if="selectedIngredients.includes(ingredient)"
            class="w-4 h-4 text-primary-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePantryStore } from '@/stores/pantryStore'
import { useRecipeStore } from '@/stores/recipeStore'

const { t } = useI18n()
const pantryStore = usePantryStore()
const recipeStore = useRecipeStore()

const searchQuery = ref('')
const showDropdown = ref(false)

const selectedIngredients = computed(() => pantryStore.selectedIngredients)

const filteredAvailableIngredients = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return recipeStore.getAllIngredients
    .filter(ing => 
      ing.toLowerCase().includes(query) && 
      !selectedIngredients.value.includes(ing)
    )
    .slice(0, 10)
})

const quickAddCategories = computed(() => [
  { name: t('category.protein'), icon: '🥩', ingredients: ['chicken breast', 'ground beef', 'salmon fillet', 'eggs'], count: 4 },
  { name: t('category.vegetables'), icon: '🥬', ingredients: ['spinach', 'tomatoes', 'onion', 'garlic', 'bell peppers'], count: 5 },
  { name: t('category.staples'), icon: '🍚', ingredients: ['rice', 'pasta', 'bread', 'potatoes'], count: 4 },
  { name: t('category.dairy'), icon: '🧀', ingredients: ['butter', 'cheese', 'milk', 'cream'], count: 4 },
])

const commonIngredients = [
  'chicken breast', 'eggs', 'garlic', 'onion', 'tomatoes', 
  'olive oil', 'butter', 'salt', 'pepper', 'pasta', 'rice',
  'spinach', 'lemon', 'cheese', 'milk', 'flour'
]

const selectIngredient = (ingredient) => {
  pantryStore.addIngredient(ingredient)
  searchQuery.value = ''
  showDropdown.value = false
}

const toggleIngredient = (ingredient) => {
  pantryStore.toggleIngredient(ingredient)
}

const clearPantry = () => {
  pantryStore.clearPantry()
}

const addCategory = (ingredients) => {
  ingredients.forEach(ing => {
    if (!selectedIngredients.value.includes(ing)) {
      pantryStore.addIngredient(ing)
    }
  })
}

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

watch(searchQuery, (newVal) => {
  pantryStore.searchQuery = newVal
})
</script>
