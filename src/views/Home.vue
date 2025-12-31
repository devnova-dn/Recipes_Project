<template>
  <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
    <!-- Left Panel - Pantry & Filters -->
    <div class="xl:col-span-4 2xl:col-span-3 space-y-6">
      <!-- Ingredients Panel -->
      <div class="card p-5 xl:sticky xl:top-24">
        <IngredientSelector />
      </div>

      <!-- Compact Filters (Mobile & Tablet) -->
      <div class="lg:hidden card p-5">
        <Filters />
      </div>
    </div>

    <!-- Right Panel - Recipe List -->
    <div class="xl:col-span-8 2xl:col-span-9">
      <RecipeList />
    </div>

    <!-- Right Sidebar - Tips & Stats (Desktop) -->
    <div class="hidden 2xl:block 2xl:col-span-3">
      <div class="sticky top-24 space-y-4">
        <!-- Tips Card -->
        <div class="card p-5 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/20">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-surface-200">{{ $t('tips.title') }}</h3>
          </div>
          <ul class="space-y-2.5 text-sm text-surface-400">
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ $t('tips.tip1') }}</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ $t('tips.tip2') }}</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ $t('tips.tip3') }}</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ $t('tips.tip4') }}</span>
            </li>
          </ul>
        </div>

        <!-- Stats Card -->
        <div class="card p-5">
          <h3 class="font-semibold text-surface-200 mb-4">{{ $t('recipeDetail.nutrition') }}</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center p-2 rounded-lg bg-surface-800/50">
              <span class="text-surface-400 text-sm">{{ $t('stats.totalRecipes') }}</span>
              <span class="text-lg font-bold text-primary-400">{{ recipeStore.recipes.length }}</span>
            </div>
            <div class="flex justify-between items-center p-2 rounded-lg bg-surface-800/50">
              <span class="text-surface-400 text-sm">{{ $t('stats.selectedIngredients') }}</span>
              <span class="text-lg font-bold text-accent-400">{{ pantryStore.selectedIngredients.length }}</span>
            </div>
            <div class="flex justify-between items-center p-2 rounded-lg bg-surface-800/50">
              <span class="text-surface-400 text-sm">{{ $t('stats.currentMatches') }}</span>
              <span class="text-lg font-bold text-pink-400">{{ recipeStore.filteredAndSortedRecipes.length }}</span>
            </div>
          </div>
        </div>

        <!-- Filters (2xl Desktop) -->
        <div class="card p-5">
          <Filters />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IngredientSelector from '@/components/IngredientSelector.vue'
import Filters from '@/components/Filters.vue'
import RecipeList from '@/components/RecipeList.vue'
import { useRecipeStore } from '@/stores/recipeStore'
import { usePantryStore } from '@/stores/pantryStore'

const recipeStore = useRecipeStore()
const pantryStore = usePantryStore()
</script>
