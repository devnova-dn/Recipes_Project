import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    app: {
      title: 'DishDiscovery 3D',
      subtitle: 'Smart Recipe Finder'
    },
    nav: {
      discover: 'Discover Recipes'
    },
    pantry: {
      title: 'Select Your Ingredients',
      subtitle: 'Choose ingredients from your pantry and we\'ll find the best recipes',
      searchPlaceholder: 'Search ingredients...',
      selected: 'selected',
      clearAll: 'Clear All',
      quickAdd: 'Quick Add',
      commonIngredients: 'Common Ingredients',
      ingredients: 'ingredients'
    },
    filters: {
      title: 'Filters & Search',
      searchPlaceholder: 'Search recipes...',
      dietary: 'Dietary Preferences',
      difficulty: 'Difficulty Level',
      cookingTime: 'Cooking Time',
      under20min: 'Under 20 min',
      between: '20-40 min',
      over40min: 'Over 40 min',
      clearFilters: 'Clear Filters'
    },
    recipes: {
      title: 'Discover Recipes',
      found: 'recipes found',
      match: 'match',
      basedOn: 'Based on your',
      sortBy: 'Sort by',
      bestMatch: 'Best Match',
      cookingTime: 'Cooking Time',
      calories: 'Calories',
      noMatch: 'No matching recipes found',
      tryMore: 'Try adding more ingredients or adjusting filters',
      clearFilters: 'Clear Filters',
      viewRecipe: 'View Recipe',
      missing: 'missing',
      time: 'min',
      caloriesUnit: 'cal'
    },
    recipeDetail: {
      back: 'Back to Recipes',
      about: 'About This Dish',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
      nutrition: 'Nutrition',
      tips: 'Cooking Tips',
      youHave: 'You have',
      moreToGo: 'more to go',
      prepTime: 'Prep Time',
      difficulty: 'Difficulty',
      servings: 'Servings'
    },
    tips: {
      title: 'Usage Tips',
      tip1: 'Select more ingredients for better matches',
      tip2: 'Click ingredient tags to remove them',
      tip3: 'Use filters to narrow down results',
      tip4: 'Best matches show match percentage'
    },
    stats: {
      totalRecipes: 'Total Recipes',
      selectedIngredients: 'Selected Ingredients',
      currentMatches: 'Current Matches'
    },
    category: {
      protein: 'Protein',
      vegetables: 'Vegetables',
      staples: 'Staples',
      dairy: 'Dairy'
    }
  },
  fr: {
    app: {
      title: 'DishDiscovery 3D',
      subtitle: 'chercheur de Recettes Intelligent'
    },
    nav: {
      discover: 'Découvrir les Recettes'
    },
    pantry: {
      title: 'Sélectionnez Vos Ingrédients',
      subtitle: 'Choisissez les ingrédients de votre garde-manger et nous trouverons les meilleures recettes',
      searchPlaceholder: 'Rechercher des ingrédients...',
      selected: 'sélectionnés',
      clearAll: 'Tout Effacer',
      quickAdd: 'Ajout Rapide',
      commonIngredients: 'Ingrédents Courants',
      ingredients: 'ingrédents'
    },
    filters: {
      title: 'Filtres et Recherche',
      searchPlaceholder: 'Rechercher des recettes...',
      dietary: 'Préférences Alimentaires',
      difficulty: 'Niveau de Difficulté',
      cookingTime: 'Temps de Cuisson',
      under20min: 'Moins de 20 min',
      between: '20-40 min',
      over40min: 'Plus de 40 min',
      clearFilters: 'Effacer les Filtres'
    },
    recipes: {
      title: 'Découvrir les Recettes',
      found: 'recettes trouvées',
      match: 'correspondance',
      basedOn: 'Basé sur vos',
      sortBy: 'Trier par',
      bestMatch: 'Meilleure Correspondance',
      cookingTime: 'Temps de Cuisson',
      calories: 'Calories',
      noMatch: 'Aucune recette correspondante trouvée',
      tryMore: 'Essayez d\'ajouter plus d\'ingrédents ou d\'ajuster les filtres',
      clearFilters: 'Effacer les Filtres',
      viewRecipe: 'Voir la Recette',
      missing: 'manquants',
      time: 'min',
      caloriesUnit: 'cal'
    },
    recipeDetail: {
      back: 'Retour aux Recettes',
      about: 'À Propos de ce Plat',
      ingredients: 'Ingrédents',
      instructions: 'Instructions',
      nutrition: 'Nutrition',
      tips: 'Conseils de Cuisson',
      youHave: 'Vous avez',
      moreToGo: 'de plus à préparer',
      prepTime: 'Temps de Préparation',
      difficulty: 'Difficulté',
      servings: 'Portions'
    },
    tips: {
      title: 'Conseils d\'Utilisation',
      tip1: 'Sélectionnez plus d\'ingrédents pour de meilleures correspondances',
      tip2: 'Cliquez sur les tags d\'ingrédents pour les supprimer',
      tip3: 'Utilisez les filtres pour affiner les résultats',
      tip4: 'Les meilleures correspondances montrent le pourcentage'
    },
    stats: {
      totalRecipes: 'Recettes Totales',
      selectedIngredients: 'Ingrédents Sélectionnés',
      currentMatches: 'Correspondances Actuelles'
    },
    category: {
      protein: 'Protéines',
      vegetables: 'Légumes',
      staples: 'Féculents',
      dairy: 'Produits Laitiers'
    }
  },
  es: {
    app: {
      title: 'DishDiscovery 3D',
      subtitle: 'Buscador de Recetas Inteligente'
    },
    nav: {
      discover: 'Descubrir Recetas'
    },
    pantry: {
      title: 'Seleccione Sus Ingredientes',
      subtitle: 'Elija ingredientes de su despensa y encontraremos las mejores recetas',
      searchPlaceholder: 'Buscar ingredientes...',
      selected: 'seleccionados',
      clearAll: 'Limpiar Todo',
      quickAdd: 'Agregar Rápido',
      commonIngredients: 'Ingredientes Comunes',
      ingredients: 'ingredientes'
    },
    filters: {
      title: 'Filtros y Búsqueda',
      searchPlaceholder: 'Buscar recetas...',
      dietary: 'Preferencias Dietéticas',
      difficulty: 'Nivel de Dificultad',
      cookingTime: 'Tiempo de Cocción',
      under20min: 'Menos de 20 min',
      between: '20-40 min',
      over40min: 'Más de 40 min',
      clearFilters: 'Limpiar Filtros'
    },
    recipes: {
      title: 'Descubrir Recetas',
      found: 'recetas encontradas',
      match: 'coincidencia',
      basedOn: 'Basado en sus',
      sortBy: 'Ordenar por',
      bestMatch: 'Mejor Coincidencia',
      cookingTime: 'Tiempo de Cocción',
      calories: 'Calorías',
      noMatch: 'No se encontraron recetas coincidentes',
      tryMore: 'Intente agregar más ingredientes o ajustar los filtros',
      clearFilters: 'Limpiar Filtros',
      viewRecipe: 'Ver Receta',
      missing: 'faltantes',
      time: 'min',
      caloriesUnit: 'cal'
    },
    recipeDetail: {
      back: 'Volver a Recetas',
      about: 'Acerca de Este Plato',
      ingredients: 'Ingredientes',
      instructions: 'Instrucciones',
      nutrition: 'Nutrición',
      tips: 'Consejos de Cocción',
      youHave: 'Tienes',
      moreToGo: 'más por preparar',
      prepTime: 'Tiempo de Preparación',
      difficulty: 'Dificultad',
      servings: 'Porciones'
    },
    tips: {
      title: 'Consejos de Uso',
      tip1: 'Selecciona más ingredientes para mejores coincidencias',
      tip2: 'Haz clic en las etiquetas de ingredientes para eliminarlos',
      tip3: 'Usa los filtros para reducir los resultados',
      tip4: 'Las mejores coincidencias muestran el porcentaje'
    },
    stats: {
      totalRecipes: 'Recetas Totales',
      selectedIngredients: 'Ingredientes Seleccionados',
      currentMatches: 'Coincidencias Actuales'
    },
    category: {
      protein: 'Proteínas',
      vegetables: 'Verduras',
      staples: 'Básicos',
      dairy: 'Lácteos'
    }
  },
  zh: {
    app: {
      title: 'DishDiscovery 3D',
      subtitle: '智能食谱发现'
    },
    nav: {
      discover: '发现食谱'
    },
    pantry: {
      title: '选择您的食材',
      subtitle: '从您的厨房选择食材，我们会为您找到最佳食谱',
      searchPlaceholder: '搜索食材...',
      selected: '已选择',
      clearAll: '清除全部',
      quickAdd: '快速添加',
      commonIngredients: '常用食材',
      ingredients: '种食材'
    },
    filters: {
      title: '筛选与搜索',
      searchPlaceholder: '搜索食谱...',
      dietary: '饮食偏好',
      difficulty: '难度级别',
      cookingTime: '烹饪时间',
      under20min: '20分钟以下',
      between: '20-40分钟',
      over40min: '40分钟以上',
      clearFilters: '清除筛选条件'
    },
    recipes: {
      title: '发现食谱',
      found: '个匹配食谱',
      match: '匹配',
      basedOn: '根据您选择的',
      sortBy: '排序方式',
      bestMatch: '最佳匹配',
      cookingTime: '烹饪时间',
      calories: '卡路里',
      noMatch: '没有找到匹配的食谱',
      tryMore: '尝试添加更多食材或调整筛选条件',
      clearFilters: '清除筛选条件',
      viewRecipe: '查看食谱',
      missing: '种食材',
      time: '分钟',
      caloriesUnit: '卡'
    },
    recipeDetail: {
      back: '返回食谱列表',
      about: '关于这道菜',
      ingredients: '所需食材',
      instructions: '烹饪步骤',
      nutrition: '营养信息',
      tips: '烹饪小贴士',
      youHave: '您已有',
      moreToGo: '还需准备',
      prepTime: '准备时间',
      difficulty: '难度',
      servings: '份量'
    },
    tips: {
      title: '使用提示',
      tip1: '选择越多食材，匹配结果越精准',
      tip2: '点击食材标签可快速移除',
      tip3: '使用筛选器缩小搜索范围',
      tip4: '最佳匹配会显示匹配百分比'
    },
    stats: {
      totalRecipes: '总食谱数',
      selectedIngredients: '已选食材',
      currentMatches: '当前匹配'
    },
    category: {
      protein: '蛋白质',
      vegetables: '蔬菜',
      staples: '主食',
      dairy: '乳制品'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages
})

export const setLocale = (locale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('language', locale)
}

export const t = (key) => {
  const locale = i18n.global.locale.value
  const keys = key.split('.')
  let value = messages[locale]
  
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) break
  }
  
  if (value === undefined) {
    // Fallback to English
    value = messages.en
    for (const k of keys) {
      value = value?.[k]
    }
  }
  
  return value || key
}
