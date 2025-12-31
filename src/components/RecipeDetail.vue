<template>
  <teleport to="body">
    <transition name="modal">
      <div 
        v-if="recipe"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-surface-950/80 backdrop-blur-md"
          @click="$emit('close')"
        ></div>

        <!-- Modal Content -->
        <div 
          class="relative w-full max-w-4xl max-h-[90vh] bg-surface-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          @click.stop
        >
          <!-- Close Button -->
          <button 
            @click="$emit('close')"
            class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-800/80 backdrop-blur-md flex items-center justify-center text-surface-400 hover:text-surface-100 hover:bg-surface-700 transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Scrollable Content -->
          <div class="overflow-y-auto custom-scrollbar">
            <!-- Hero Image -->
            <div class="relative h-64 md:h-80">
              <div 
                class="absolute inset-0 bg-cover bg-center"
                :style="{ backgroundImage: `url(${recipe.image})` }"
              ></div>
              <div class="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/50 to-transparent"></div>
              
              <!-- Title on Image -->
              <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 class="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {{ recipe.title }}
                </h2>
                <p class="text-surface-300 text-lg">{{ recipe.shortDescription }}</p>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 md:p-8 space-y-8">
              <!-- Quick Info -->
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2 px-4 py-2 bg-surface-800 rounded-xl">
                  <svg class="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-surface-200">{{ recipe.time }} {{ $t('recipes.time') }}</span>
                </div>
                <div class="flex items-center gap-2 px-4 py-2 bg-surface-800 rounded-xl">
                  <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span class="text-surface-200">{{ recipe.difficulty }}</span>
                </div>
                <div class="flex items-center gap-2 px-4 py-2 bg-surface-800 rounded-xl">
                  <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                  </svg>
                  <span class="text-surface-200">{{ recipe.calories }} {{ $t('recipes.caloriesUnit') }}</span>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in recipe.tags" 
                  :key="tag"
                  class="badge bg-primary-500/20 text-primary-300 border border-primary-500/30"
                >
                  {{ tag }}
                </span>
                <span 
                  v-for="diet in recipe.dietary" 
                  :key="diet"
                  class="badge bg-accent-500/20 text-accent-300 border border-accent-500/30"
                >
                  {{ diet }}
                </span>
              </div>

              <!-- Description -->
              <div class="p-6 bg-surface-800/50 rounded-2xl border border-surface-700/50">
                <h3 class="text-lg font-semibold text-surface-200 mb-3">{{ $t('recipeDetail.about') }}</h3>
                <p class="text-surface-400 leading-relaxed">{{ recipe.fullDescription }}</p>
              </div>

              <!-- Tabs -->
              <div class="space-y-4">
                <div class="flex gap-2 border-b border-surface-700">
                  <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                      'px-6 py-3 text-sm font-medium transition-all duration-300 border-b-2 -mb-px',
                      activeTab === tab.id
                        ? 'text-primary-400 border-primary-500'
                        : 'text-surface-400 border-transparent hover:text-surface-200'
                    ]"
                  >
                    {{ tab.name }}
                  </button>
                </div>

                <!-- Ingredients Tab -->
                <div v-if="activeTab === 'ingredients'" class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div 
                      v-for="(ingredient, index) in recipe.ingredients" 
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
                    </div>
                  </div>
                </div>

                <!-- Instructions Tab -->
                <div v-if="activeTab === 'instructions'" class="space-y-4">
                  <div 
                    v-for="(step, index) in recipe.instructions" 
                    :key="index"
                    class="flex gap-4 p-4 bg-surface-800/50 rounded-xl border border-surface-700/50"
                  >
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                      {{ index + 1 }}
                    </div>
                    <p class="text-surface-300 leading-relaxed pt-0.5">{{ step }}</p>
                  </div>
                </div>

                <!-- Nutrition Tab -->
                <div v-if="activeTab === 'nutrition'" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="p-4 bg-surface-800/50 rounded-xl border border-surface-700/50 text-center">
                    <div class="text-2xl font-bold text-primary-400">{{ recipe.calories }}</div>
                    <div class="text-sm text-surface-500">{{ $t('recipes.calories') }}</div>
                  </div>
                  <div class="p-4 bg-surface-800/50 rounded-xl border border-surface-700/50 text-center">
                    <div class="text-2xl font-bold text-accent-400">{{ recipe.protein }}g</div>
                    <div class="text-sm text-surface-500">Protein</div>
                  </div>
                  <div class="p-4 bg-surface-800/50 rounded-xl border border-surface-700/50 text-center">
                    <div class="text-2xl font-bold text-pink-400">{{ recipe.carbs }}g</div>
                    <div class="text-sm text-surface-500">Carbs</div>
                  </div>
                  <div class="p-4 bg-surface-800/50 rounded-xl border border-surface-700/50 text-center">
                    <div class="text-2xl font-bold text-yellow-400">{{ recipe.fat }}g</div>
                    <div class="text-sm text-surface-500">Fat</div>
                  </div>
                </div>

                <!-- Tips Tab -->
                <div v-if="activeTab === 'tips'" class="p-6 bg-accent-500/10 rounded-xl border border-accent-500/30">
                  <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                    <div>
                      <h4 class="font-semibold text-accent-200 mb-2">{{ $t('recipeDetail.tips') }}</h4>
                      <p class="text-surface-400">{{ recipe.tips }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { usePantryStore } from '@/stores/pantryStore'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
const pantryStore = usePantryStore()

const activeTab = ref('ingredients')

const tabs = [
  { id: 'ingredients', name: 'Ingredients' },
  { id: 'instructions', name: 'Instructions' },
  { id: 'nutrition', name: 'Nutrition' },
  { id: 'tips', name: 'Tips' }
]
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.7);
}
</style>
