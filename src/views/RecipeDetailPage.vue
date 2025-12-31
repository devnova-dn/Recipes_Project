<template>
  <div class="min-h-screen">
    <!-- Back Button -->
    <div class="mb-6">
      <button 
        @click="$router.push('/')"
        class="flex items-center gap-2 text-surface-400 hover:text-primary-400 transition-colors duration-300 group"
      >
        <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span>{{ $t('recipeDetail.back') }}</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="!recipe" class="flex items-center justify-center py-32">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-surface-400">Loading...</p>
      </div>
    </div>

    <!-- Recipe Content -->
    <div v-else class="space-y-8">
      <!-- Hero Section -->
      <div class="relative h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden">
        <div 
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${recipe.image})` }"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/60 to-transparent"></div>
        
        <!-- Title Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div class="flex flex-wrap gap-2 mb-3">
            <span 
              v-for="tag in recipe.tags.slice(0, 3)" 
              :key="tag"
              class="badge bg-primary-500/80 text-white"
            >
              {{ tag }}
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
            {{ recipe.title }}
          </h1>
          <p class="text-surface-300 text-lg max-w-2xl">{{ recipe.shortDescription }}</p>
        </div>

        <!-- Match Badge (if applicable) -->
        <div 
          v-if="matchPercentage > 0"
          class="absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-md"
          :class="matchPercentage >= 70 ? 'bg-accent-500/90' : 'bg-primary-500/90'"
        >
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-white font-bold">{{ matchPercentage }}% {{ $t('recipes.match') }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Info Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card p-4 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-surface-100">{{ recipe.time }}</div>
            <div class="text-sm text-surface-500">{{ $t('recipes.time') }}</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-surface-100">{{ recipe.difficulty }}</div>
            <div class="text-sm text-surface-500">{{ $t('recipeDetail.difficulty') }}</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-surface-100">{{ recipe.calories }}</div>
            <div class="text-sm text-surface-500">{{ $t('recipes.calories') }}</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-surface-100">{{ recipe.calories / 50 | integer }}</div>
            <div class="text-sm text-surface-500">{{ $t('recipeDetail.servings') }}</div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="card p-6 md:p-8">
        <h2 class="text-2xl font-display font-bold text-surface-100 mb-4">{{ $t('recipeDetail.about') }}</h2>
        <p class="text-surface-400 leading-relaxed text-lg">{{ recipe.fullDescription }}</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Ingredients Column -->
        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-24">
            <h2 class="text-xl font-display font-bold text-surface-100 mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              {{ $t('recipeDetail.ingredients') }}
            </h2>
            
            <!-- Matching Status -->
            <div 
              v-if="matchPercentage > 0 && matchingIngredients.length > 0"
              class="mb-4 p-3 rounded-lg bg-primary-500/10 border border-primary-500/30"
            >
              <div class="flex items-center gap-2 text-primary-300 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>{{ $t('recipeDetail.youHave') }} {{ matchingIngredients.length }} {{ $t('pantry.ingredients') }}</span>
              </div>
            </div>

            <!-- Ingredients List -->
            <ul class="space-y-3">
              <li 
                v-for="ingredient in recipe.ingredients" 
                :key="ingredient"
                :class="[
                  'flex items-center gap-3 p-3 rounded-xl transition-all duration-300 capitalize',
                  pantryStore.selectedIngredients.includes(ingredient)
                    ? 'bg-primary-500/20 border border-primary-500/30'
                    : 'bg-surface-800/50 border border-surface-700/50'
                ]"
              >
                <div 
                  :class="[
                    'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300',
                    pantryStore.selectedIngredients.includes(ingredient)
                      ? 'bg-primary-500'
                      : 'bg-surface-700'
                  ]"
                >
                  <svg 
                    v-if="pantryStore.selectedIngredients.includes(ingredient)"
                    class="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span 
                  :class="[
                    'text-sm',
                    pantryStore.selectedIngredients.includes(ingredient)
                      ? 'text-primary-200 font-medium'
                      : 'text-surface-300'
                  ]"
                >
                  {{ ingredient }}
                </span>
              </li>
            </ul>

            <!-- Missing Ingredients -->
            <div 
              v-if="missingIngredients.length > 0"
              class="mt-6 p-4 rounded-xl bg-accent-500/10 border border-accent-500/30"
            >
              <h3 class="text-accent-200 font-medium mb-2 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ $t('recipeDetail.moreToGo') }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="ing in missingIngredients"
                  :key="ing"
                  class="text-sm text-accent-300 capitalize"
                >
                  {{ ing }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Instructions Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Instructions -->
          <div class="card p-6 md:p-8">
            <h2 class="text-xl font-display font-bold text-surface-100 mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              {{ $t('recipeDetail.instructions') }}
            </h2>
            
            <div class="space-y-6">
              <div 
                v-for="(step, index) in recipe.instructions" 
                :key="index"
                class="flex gap-4"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/30">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-grow pt-1">
                  <p class="text-surface-300 leading-relaxed">{{ step }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Nutrition Info -->
          <div class="card p-6 md:p-8">
            <h2 class="text-xl font-display font-bold text-surface-100 mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              {{ $t('recipeDetail.nutrition') }}
            </h2>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="p-4 bg-surface-800/50 rounded-xl text-center">
                <div class="text-3xl font-bold text-primary-400">{{ recipe.calories }}</div>
                <div class="text-sm text-surface-500 mt-1">{{ $t('recipes.calories') }}</div>
              </div>
              <div class="p-4 bg-surface-800/50 rounded-xl text-center">
                <div class="text-3xl font-bold text-accent-400">{{ recipe.protein }}g</div>
                <div class="text-sm text-surface-500 mt-1">Protein</div>
              </div>
              <div class="p-4 bg-surface-800/50 rounded-xl text-center">
                <div class="text-3xl font-bold text-pink-400">{{ recipe.carbs }}g</div>
                <div class="text-sm text-surface-500 mt-1">Carbs</div>
              </div>
              <div class="p-4 bg-surface-800/50 rounded-xl text-center">
                <div class="text-3xl font-bold text-yellow-400">{{ recipe.fat }}g</div>
                <div class="text-sm text-surface-500 mt-1">Fat</div>
              </div>
            </div>
          </div>

          <!-- Tips -->
          <div class="card p-6 md:p-8 bg-gradient-to-br from-primary-500/5 to-accent-500/5 border-primary-500/20">
            <h2 class="text-xl font-display font-bold text-surface-100 mb-4 flex items-center gap-3">
              <svg class="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              {{ $t('recipeDetail.tips') }}
            </h2>
            <p class="text-surface-400 leading-relaxed">{{ recipe.tips }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/stores/recipeStore'
import { usePantryStore } from '@/stores/pantryStore'

const route = useRoute()
const recipeStore = useRecipeStore()
const pantryStore = usePantryStore()

const recipe = computed(() => recipeStore.getRecipeById(route.params.id))

const matchingIngredients = computed(() => {
  if (!recipe.value) return []
  return recipe.value.ingredients.filter(ing => pantryStore.selectedIngredients.includes(ing))
})

const missingIngredients = computed(() => {
  if (!recipe.value) return []
  return recipe.value.ingredients.filter(ing => !pantryStore.selectedIngredients.includes(ing))
})

const matchPercentage = computed(() => {
  if (!recipe.value) return 0
  const total = recipe.value.ingredients.length
  const matched = matchingIngredients.value.length
  return Math.round((matched / total) * 100)
})
</script>
