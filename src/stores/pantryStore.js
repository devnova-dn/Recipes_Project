import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePantryStore = defineStore('pantry', () => {
  const selectedIngredients = ref([])
  const searchQuery = ref('')

  const addIngredient = (ingredient) => {
    if (!selectedIngredients.value.includes(ingredient)) {
      selectedIngredients.value.push(ingredient)
    }
  }

  const removeIngredient = (ingredient) => {
    const index = selectedIngredients.value.indexOf(ingredient)
    if (index > -1) {
      selectedIngredients.value.splice(index, 1)
    }
  }

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.value.includes(ingredient)) {
      removeIngredient(ingredient)
    } else {
      addIngredient(ingredient)
    }
  }

  const clearPantry = () => {
    selectedIngredients.value = []
    searchQuery.value = ''
  }

  const filteredAvailableIngredients = computed(() => {
    if (!searchQuery.value) return []
    const query = searchQuery.value.toLowerCase()
    return mockIngredients.filter(ing => 
      ing.toLowerCase().includes(query) && 
      !selectedIngredients.value.includes(ing)
    ).slice(0, 10)
  })

  return {
    selectedIngredients,
    searchQuery,
    addIngredient,
    removeIngredient,
    toggleIngredient,
    clearPantry,
    filteredAvailableIngredients
  }
})

const mockIngredients = [
  "chicken breast", "ground beef", "salmon fillet", "ground lamb", "bacon", "pork chops",
  "eggs", "tofu", "shrimp", "tuna", "sausage", "turkey",
  "pasta", "rice", "arborio rice", "quinoa", "jasmine rice", "brown rice", "couscous",
  "bread", "pita bread", "tortillas", "baguette", "sourdough", "bagels",
  "milk", "cream", "butter", "yogurt", "cheese", "parmesan", "feta", "mozzarella", "cheddar",
  "olive oil", "vegetable oil", "coconut oil", "sesame oil",
  "garlic", "onion", "shallots", "scallions", "leeks",
  "tomatoes", "cherry tomatoes", "sun-dried tomatoes", "tomato paste", "canned tomatoes",
  "carrots", "celery", "bell peppers", "mushrooms", "spinach", "kale", "broccoli",
  "zucchini", "eggplant", "cucumber", "avocado", "lettuce", "cabbage",
  "potatoes", "sweet potatoes", "corn", "peas", "green beans", "asparagus",
  "lemon", "lime", "orange", "apple", "banana", "berries", "mango", "pineapple",
  "basil", "cilantro", "parsley", "mint", "rosemary", "thyme", "oregano", "dill",
  "ginger", "cumin", "paprika", "cinnamon", "nutmeg", "coriander", "turmeric", "cardamom",
  "salt", "pepper", "sugar", "honey", "maple syrup",
  "soy sauce", "fish sauce", "vinegar", "mustard", "ketchup", "mayonnaise",
  "coconut milk", "vegetable broth", "chicken broth", "beef broth", "wine",
  "flour", "baking powder", "baking soda", "yeast", "cornstarch", "oats",
  "nuts", "almonds", "walnuts", "peanuts", "cashews",
  "chocolate", "cocoa", "vanilla", "almond extract",
  "chickpeas", "black beans", "kidney beans", "lentils", "cannellini beans"
]
