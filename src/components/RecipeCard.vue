<template>
  <div
    class="recipe-card-3d group relative card-hover overflow-hidden cursor-pointer"
    :class="[
      matchPercentage >= 70 ? 'ring-2 ring-primary-500/50 shadow-glow' : '',
      matchPercentage >= 90 ? 'ring-2 ring-accent-400/60 shadow-glow-lg' : ''
    ]"
    @click="$emit('click')"
  >
    <!-- Match Badge -->
    <div 
      v-if="matchPercentage > 0"
      class="absolute top-3 left-3 z-20"
    >
      <div 
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
        :class="matchPercentage >= 70 ? 'bg-accent-500/90' : 'bg-primary-500/80'"
      >
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span class="text-white font-bold text-sm">{{ matchPercentage }}% {{ $t('recipes.match') }}</span>
      </div>
    </div>

    <!-- 3D Image Container -->
    <div class="relative h-48 md:h-56 overflow-hidden">
      <!-- Image with parallax effect -->
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        :style="{ backgroundImage: `url(${recipe.image})` }"
      ></div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/20 to-transparent"></div>
      
      <!-- Difficulty Badge -->
      <div class="absolute top-3 right-3">
        <span 
          class="badge backdrop-blur-md"
          :class="{
            'bg-accent-500/80 text-white': recipe.difficulty === 'Easy',
            'bg-primary-500/80 text-white': recipe.difficulty === 'Medium',
            'bg-pink-500/80 text-white': recipe.difficulty === 'Hard'
          }"
        >
          {{ recipe.difficulty }}
        </span>
      </div>

      <!-- 3D Floating Element -->
      <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
    </div>

    <!-- Content -->
    <div class="p-5 relative">
      <!-- Title -->
      <h3 class="text-lg md:text-xl font-display font-bold text-surface-100 mb-2 line-clamp-1 group-hover:text-primary-300 transition-colors duration-300">
        {{ recipe.title }}
      </h3>

      <!-- Description -->
      <p class="text-surface-400 text-sm line-clamp-2 mb-4">
        {{ recipe.shortDescription }}
      </p>

      <!-- Meta Info -->
      <div class="flex items-center gap-4 mb-4">
        <!-- Time -->
        <div class="flex items-center gap-1.5 text-surface-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-sm">{{ recipe.time }} {{ $t('recipes.time') }}</span>
        </div>

        <!-- Calories -->
        <div class="flex items-center gap-1.5 text-surface-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
          </svg>
          <span class="text-sm">{{ recipe.calories }} {{ $t('recipes.caloriesUnit') }}</span>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in recipe.tags.slice(0, 3)" 
          :key="tag"
          class="badge bg-surface-700/50 text-surface-400 text-xs"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Missing Ingredients -->
      <div v-if="missingCount > 0 && matchPercentage > 0" class="mb-4 p-3 rounded-lg bg-surface-700/30 border border-surface-600/30">
        <div class="flex items-center gap-2 mb-1">
          <svg class="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-xs text-surface-400">{{ $t('recipes.missing') }} {{ missingCount }} {{ $t('pantry.ingredients') }}</span>
        </div>
        <div class="flex flex-wrap gap-1">
          <span 
            v-for="ing in missingIngredients.slice(0, 4)" 
            :key="ing"
            class="text-xs text-accent-300 capitalize"
          >
            {{ ing }}{{ missingIngredients.indexOf(ing) < Math.min(missingCount, 4) - 1 ? ', ' : '' }}
          </span>
          <span v-if="missingCount > 4" class="text-xs text-surface-500">...</span>
        </div>
      </div>

      <!-- View Recipe Button -->
      <button class="w-full btn-primary flex items-center justify-center gap-2 group/btn">
        <span>{{ $t('recipes.viewRecipe') }}</span>
        <svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </button>
    </div>

    <!-- Hover Glow Effect -->
    <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  },
  matchPercentage: {
    type: Number,
    default: 0
  },
  missingCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['click'])

const missingIngredients = computed(() => {
  if (!props.recipe.matchingIngredients) return []
  return props.recipe.ingredients.filter(
    ing => !props.recipe.matchingIngredients?.includes(ing)
  )
})
</script>

<style scoped>
.card-hover {
  transform-style: preserve-3d;
}

.card-hover:hover {
  transform: translateY(-8px) rotateX(2deg);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
