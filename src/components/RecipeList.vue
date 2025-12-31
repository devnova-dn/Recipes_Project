<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100">
          {{ $t('recipes.title') }}
        </h2>
        <p class="text-surface-400 mt-1">
          <template v-if="pantryStore.selectedIngredients.length > 0">
            {{ $t('recipes.basedOn') }} <span class="text-primary-400 font-medium">{{ pantryStore.selectedIngredients.length }}</span> {{ $t('pantry.ingredients') }}，{{ $t('recipes.found') }} <span class="text-accent-400 font-bold">{{ filteredRecipes.length }}</span>
          </template>
          <template v-else>
            {{ $t('pantry.subtitle') }}
          </template>
        </p>
      </div>

      <!-- Sort Options -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-surface-500">{{ $t('recipes.sortBy') }}:</span>
        <select 
          v-model="sortBy"
          class="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer"
        >
          <option value="match">{{ $t('recipes.bestMatch') }}</option>
          <option value="time">{{ $t('recipes.cookingTime') }}</option>
          <option value="calories">{{ $t('recipes.calories') }}</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="recipeStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="card overflow-hidden animate-pulse">
        <div class="h-48 bg-surface-700"></div>
        <div class="p-5 space-y-4">
          <div class="h-6 bg-surface-700 rounded w-3/4"></div>
          <div class="h-4 bg-surface-700 rounded w-full"></div>
          <div class="h-4 bg-surface-700 rounded w-2/3"></div>
          <div class="flex gap-4">
            <div class="h-4 bg-surface-700 rounded w-16"></div>
            <div class="h-4 bg-surface-700 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredRecipes.length === 0" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-surface-800 flex items-center justify-center">
        <svg class="w-12 h-12 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-surface-300 mb-2">{{ $t('recipes.noMatch') }}</h3>
      <p class="text-surface-500 max-w-md mx-auto">
        {{ $t('recipes.tryMore') }}
      </p>
      <button 
        @click="clearAll"
        class="mt-6 btn-primary"
      >
        {{ $t('recipes.clearFilters') }}
      </button>
    </div>

    <!-- Recipe Grid -->
    <transition-group 
      v-else
      name="list" 
      tag="div"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <RecipeCard
        v-for="recipe in sortedRecipes"
        :key="recipe.id"
        :recipe="recipe"
        :match-percentage="recipe.matchPercentage"
        :missing-count="recipe.missingCount"
        @click="viewRecipe(recipe.id)"
      />
    </transition-group>

    <!-- View Recipe Modal -->
    <RecipeDetail
      v-if="selectedRecipe"
      :recipe="selectedRecipe"
      @close="selectedRecipe = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '@/stores/recipeStore'
import { usePantryStore } from '@/stores/pantryStore'
import RecipeCard from './RecipeCard.vue'
import RecipeDetail from './RecipeDetail.vue'

const router = useRouter()
const recipeStore = useRecipeStore()
const pantryStore = usePantryStore()

const selectedRecipe = ref(null)
const sortBy = ref('match')

const filteredRecipes = computed(() => recipeStore.filteredAndSortedRecipes)

const sortedRecipes = computed(() => {
  const recipes = [...filteredRecipes.value]
  
  switch (sortBy.value) {
    case 'time':
      return recipes.sort((a, b) => a.time - b.time)
    case 'calories':
      return recipes.sort((a, b) => a.calories - b.calories)
    default:
      return recipes
  }
})

const viewRecipe = (id) => {
  router.push(`/recipe/${id}`)
}

const clearAll = () => {
  pantryStore.clearPantry()
  recipeStore.clearFilters()
}
</script>
