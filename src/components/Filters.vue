<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
        </svg>
        <h3 class="text-lg font-semibold text-surface-200">{{ $t('filters.title') }}</h3>
      </div>
      
      <!-- Clear All Button -->
      <button
        v-if="hasActiveFilters"
        @click="clearAll"
        class="text-xs text-pink-400 hover:text-pink-300 transition-colors duration-200 flex items-center gap-1"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        {{ $t('filters.clearFilters') }}
      </button>
    </div>

    <!-- Search -->
    <div class="relative">
      <input
        :value="searchQuery"
        @input="updateSearch"
        type="text"
        :placeholder="$t('filters.searchPlaceholder')"
        class="input-field pl-10 text-sm"
      >
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>

    <!-- Collapsible Filter Sections -->
    <div class="space-y-2">
      <!-- Filter Tabs -->
      <div class="flex gap-1 p-1 bg-surface-800/50 rounded-xl">
        <button
          v-for="tab in filterTabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1',
            activeTab === tab.id 
              ? 'bg-primary-500/30 text-primary-200' 
              : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
          ]"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          <span class="hidden sm:inline">{{ tab.name }}</span>
          <!-- Active indicator -->
          <span 
            v-if="getActiveCount(tab.id) > 0"
            class="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
            :class="activeTab === tab.id ? 'bg-primary-500 text-white' : 'bg-accent-500 text-white'"
          >
            {{ getActiveCount(tab.id) }}
          </span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="card p-4">
        <!-- Dietary Tab -->
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'dietary'" key="dietary" class="space-y-3">
            <h4 class="text-sm font-medium text-surface-400">{{ $t('filters.dietary') }}</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="diet in dietaryOptions"
                :key="diet.id"
                @click="toggleDietary(diet.id)"
                :class="[
                  'badge transition-all duration-300 cursor-pointer',
                  activeFilters.dietary.includes(diet.id) 
                    ? 'bg-primary-500/30 text-primary-200 border-primary-500/50' 
                    : 'bg-surface-700/50 text-surface-400 border-surface-600/50 hover:bg-surface-600/50'
                ]"
              >
                <span>{{ diet.icon }}</span>
                <span>{{ diet.name }}</span>
              </button>
            </div>
          </div>

          <div v-else-if="activeTab === 'difficulty'" key="difficulty" class="space-y-3">
            <h4 class="text-sm font-medium text-surface-400">{{ $t('filters.difficulty') }}</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="diff in difficultyOptions"
                :key="diff.id"
                @click="toggleDifficulty(diff.id)"
                :class="[
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 cursor-pointer',
                  activeFilters.difficulty.includes(diff.id)
                    ? diff.id === 'Easy' 
                      ? 'bg-accent-500/30 text-accent-200 border-accent-500/50'
                      : diff.id === 'Medium'
                        ? 'bg-primary-500/30 text-primary-200 border-primary-500/50'
                        : 'bg-pink-500/30 text-pink-200 border-pink-500/50'
                    : 'bg-surface-700/50 text-surface-400 border-surface-600/50 hover:bg-surface-600/50'
                ]"
              >
                {{ diff.id }}
              </button>
            </div>
          </div>

          <div v-else-if="activeTab === 'time'" key="time" class="space-y-3">
            <h4 class="text-sm font-medium text-surface-400">{{ $t('filters.cookingTime') }}</h4>
            <div class="space-y-2">
              <label
                v-for="time in timeRanges"
                :key="time.id"
                class="flex items-center gap-3 cursor-pointer group"
              >
                <div 
                  :class="[
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                    activeFilters.maxTime === (time.maxTime || 999)
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-surface-600 group-hover:border-surface-500'
                  ]"
                >
                  <div 
                    v-if="activeFilters.maxTime === (time.maxTime || 999)"
                    class="w-2 h-2 rounded-full bg-white"
                  ></div>
                </div>
                <span 
                  :class="[
                    'text-sm transition-colors duration-200',
                    activeFilters.maxTime === (time.maxTime || 999) ? 'text-primary-300' : 'text-surface-400 group-hover:text-surface-200'
                  ]"
                >
                  {{ time.name }}
                </span>
              </label>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Active Filters Summary -->
    <div v-if="hasActiveFilters" class="flex flex-wrap gap-2">
      <span 
        v-for="diet in activeFilters.dietary"
        :key="diet"
        class="inline-flex items-center gap-1 px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-lg border border-primary-500/30"
      >
        {{ getDietName(diet) }}
        <button @click="toggleDietary(diet)" class="hover:text-white">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </span>
      <span 
        v-for="diff in activeFilters.difficulty"
        :key="diff"
        class="inline-flex items-center gap-1 px-2 py-1 bg-accent-500/20 text-accent-300 text-xs rounded-lg border border-accent-500/30"
      >
        {{ diff }}
        <button @click="toggleDifficulty(diff)" class="hover:text-white">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useRecipeStore } from '@/stores/recipeStore'
import recipeData from '@/data/recipes.json'

const recipeStore = useRecipeStore()

const activeTab = ref('dietary')

const activeFilters = computed(() => recipeStore.activeFilters)
const searchQuery = computed({
  get: () => recipeStore.activeFilters.searchQuery,
  set: (val) => recipeStore.activeFilters.searchQuery = val
})

const dietaryOptions = recipeData.dietaryOptions
const difficultyOptions = recipeData.difficultyOptions
const timeRanges = recipeData.timeRanges

// Icon components
const DietaryIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

const DifficultyIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
    ])
  }
}

const TimeIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

const filterTabs = [
  { id: 'dietary', name: 'Dietary', icon: DietaryIcon },
  { id: 'difficulty', name: 'Level', icon: DifficultyIcon },
  { id: 'time', name: 'Time', icon: TimeIcon }
]

const hasActiveFilters = computed(() => {
  return activeFilters.value.dietary.length > 0 ||
         activeFilters.value.difficulty.length > 0 ||
         activeFilters.value.maxTime !== null ||
         activeFilters.value.searchQuery !== ''
})

const getActiveCount = (tabId) => {
  switch (tabId) {
    case 'dietary':
      return activeFilters.value.dietary.length
    case 'difficulty':
      return activeFilters.value.difficulty.length
    case 'time':
      return activeFilters.value.maxTime ? 1 : 0
    default:
      return 0
  }
}

const getDietName = (dietId) => {
  const diet = dietaryOptions.find(d => d.id === dietId)
  return diet ? `${diet.icon} ${diet.name}` : dietId
}

const toggleDietary = (id) => {
  recipeStore.setFilter('dietary', id)
}

const toggleDifficulty = (id) => {
  recipeStore.setFilter('difficulty', id)
}

const setTimeFilter = (maxTime) => {
  recipeStore.activeFilters.maxTime = maxTime === 999 ? null : maxTime
}

const clearAll = () => {
  recipeStore.clearFilters()
  activeTab.value = 'dietary'
}

const updateSearch = (e) => {
  recipeStore.activeFilters.searchQuery = e.target.value
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
