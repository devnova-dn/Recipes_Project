import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usePantryStore } from './pantryStore'

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref([])
  const loading = ref(false)
  const activeFilters = ref({
    dietary: [],
    difficulty: [],
    maxTime: null,
    searchQuery: ''
  })

  const pantryStore = usePantryStore()

  const initializeRecipes = async () => {
    loading.value = true
    try {
      const data = await import('../data/recipes.json')
      recipes.value = data.default.recipes
    } catch (error) {
      console.error('Failed to load recipes:', error)
    } finally {
      loading.value = false
    }
  }

  const setFilter = (key, value) => {
    if (key === 'dietary' || key === 'difficulty') {
      const index = activeFilters.value[key].indexOf(value)
      if (index > -1) {
        activeFilters.value[key].splice(index, 1)
      } else {
        activeFilters.value[key].push(value)
      }
    } else {
      activeFilters.value[key] = value
    }
  }

  const clearFilters = () => {
    activeFilters.value = {
      dietary: [],
      difficulty: [],
      maxTime: null,
      searchQuery: ''
    }
  }

  const filteredAndSortedRecipes = computed(() => {
    let result = [...recipes.value]

    // Apply dietary filters
    if (activeFilters.value.dietary.length > 0) {
      result = result.filter(recipe =>
        activeFilters.value.dietary.every(diet => recipe.dietary?.includes(diet))
      )
    }

    // Apply difficulty filters
    if (activeFilters.value.difficulty.length > 0) {
      result = result.filter(recipe =>
        activeFilters.value.difficulty.includes(recipe.difficulty)
      )
    }

    // Apply time filter
    if (activeFilters.value.maxTime) {
      result = result.filter(recipe => recipe.time <= activeFilters.value.maxTime)
    }

    // Apply search query
    if (activeFilters.value.searchQuery) {
      const query = activeFilters.value.searchQuery.toLowerCase()
      result = result.filter(recipe =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.shortDescription.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply ingredient matching from pantry
    if (pantryStore.selectedIngredients.length > 0) {
      result = result.map(recipe => {
        const matchingIngredients = recipe.ingredients.filter(ing =>
          pantryStore.selectedIngredients.includes(ing)
        )
        const matchPercentage = Math.round(
          (matchingIngredients.length / recipe.ingredients.length) * 100
        )
        const missingCount = recipe.ingredients.length - matchingIngredients.length
        return {
          ...recipe,
          matchingIngredients,
          matchPercentage,
          missingCount
        }
      })

      // Sort: higher match percentage first, then fewer missing ingredients
      result.sort((a, b) => {
        if (b.matchPercentage !== a.matchPercentage) {
          return b.matchPercentage - a.matchPercentage
        }
        return a.missingCount - b.missingCount
      })

      // Filter out recipes with 0% match
      result = result.filter(recipe => recipe.matchPercentage > 0)
    } else {
      // Reset recipe properties when no ingredients selected
      result = result.map(recipe => ({
        ...recipe,
        matchingIngredients: [],
        matchPercentage: 0,
        missingCount: recipe.ingredients.length
      }))
    }

    return result
  })

  const getRecipeById = (id) => {
    return recipes.value.find(recipe => recipe.id === parseInt(id))
  }

  const getAllIngredients = computed(() => {
    const allIngredients = new Set()
    recipes.value.forEach(recipe => {
      recipe.ingredients.forEach(ing => allIngredients.add(ing))
    })
    return Array.from(allIngredients).sort()
  })

  return {
    recipes,
    loading,
    activeFilters,
    initializeRecipes,
    setFilter,
    clearFilters,
    filteredAndSortedRecipes,
    getRecipeById,
    getAllIngredients
  }
})
