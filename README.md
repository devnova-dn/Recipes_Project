🍽️ DishDiscovery  - Smart Recipe Finder
A modern Vue 3-based smart recipe discovery application that helps you find perfect recipes based on ingredients you already have at home.

✨ Features
🔍 Smart Matching System
Ingredient Selection: Choose from a rich library of ingredients available in your kitchen
Intelligent Matching Algorithm: Automatically calculates match percentage based on selected ingredients
Match Percentage Display: Each recipe card shows match percentage and missing ingredients
Best Match Priority: Recipes with higher ingredient matches appear first
🎨 Modern UI Design
 Visual Effects:  tilt and emboss effects on card hover
Smooth Animations: Page transitions, list animations, and button hover effects
Dark Theme: Eye-friendly dark color scheme using cool tones (blue, purple, pink)
Glassmorphism: Modern semi-transparent background design with backdrop blur
Glowing Effects: Subtle glow shadows and gradient animations
🌍 Multi-Language Support
4 Languages Available:
🇺🇸 English (default)
🇫🇷 Français (French)
🇪🇸 Español (Spanish)
🇨🇳 中文 (Chinese)
Easy Language Switching: Click the globe icon in the header to switch languages
Persistent Language Choice: Language preference is saved in localStorage
🔧 Filters & Search
Dietary Preferences: Vegetarian, Vegan, Gluten-Free, Keto, High Protein, Dairy-Free
Difficulty Level: Easy, Medium, Hard
Cooking Time: Under 20 min, 20-40 min, Over 40 min
Keyword Search: Search recipes by name or tags
Tab-Based Filter Interface: Elegant compact design with Dietary, Difficulty, and Time tabs
📱 Responsive Design
Fully adaptive for desktop and mobile
Mobile-optimized layout and interactions
Touch-friendly interface elements
Collapsible filter sections for smaller screens
📊 Smart Features
Ingredient Pantry Management: Add/remove ingredients with one click
Quick Add Categories: One-click addition of protein, vegetables, staples, and dairy
Real-Time Filtering: Recipe list updates instantly as you select ingredients
Recipe Sorting: Sort by best match, cooking time, or calories
Nutrition Information: Detailed nutrition data for each recipe
🛠️ Tech Stack
Vue 3 - Using Composition API with <script setup>
Pinia - State management for ingredients and recipes
Vue Router - Client-side routing with dynamic routes
Tailwind CSS - Utility-first styling with custom design system
Vite - Lightning-fast build tool and development server
vue-i18n - Internationalization for multi-language support
📦 Installation & Usage
1. Install Dependencies
bash
cd dishdiscovery
npm install
2. Start Development Server
bash
npm run dev
The app will be available at http://localhost:5173

3. Build for Production
bash
npm run build
4. Preview Production Build
bash
npm run preview
📁 Project Structure
dishdiscovery/
├── public/
│   └── favicon.svg                  # App favicon
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── IngredientSelector.vue   # Ingredient selection component
│   │   ├── Filters.vue              # Tab-based filter component
│   │   ├── RecipeCard.vue           #  recipe card component
│   │   ├── RecipeList.vue           # Recipe grid list component
│   │   └── RecipeDetail.vue         # Recipe detail modal
│   ├── data/
│   │   └── recipes.json             # Mock recipe data (16 recipes)
│   ├── stores/
│   │   ├── pantryStore.js           # Pantry/ingredients state management
│   │   └── recipeStore.js           # Recipe state & filtering logic
│   ├── views/
│   │   ├── Home.vue                 # Main dashboard view
│   │   └── RecipeDetailPage.vue     # Full recipe detail page
│   ├── i18n.js                      # Internationalization configuration
│   ├── App.vue                      # Root component with language switcher
│   ├── main.js                      # App entry point
│   └── style.css                    # Global styles & animations
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
└── vite.config.js                   # Vite configuration
🎯 User Guide
1. Select Ingredients
Search and click ingredients in the left panel to add them to your pantry
Use Quick Add categories (Protein, Vegetables, Staples, Dairy) for fast selection
Selected recipes update in real-time based on your ingredient selection
Click ingredient tags to remove them from your selection
2. View Recipe Details
Click any recipe card to see full details
View complete ingredient list and step-by-step cooking instructions
See which ingredients you already have (highlighted in green)
Check nutrition information and cooking tips
3. Filter Results
Use the tab-based filter interface to narrow down results
Multi-select dietary preferences and difficulty levels
Filter by maximum cooking time
Clear all filters with one click
4. Change Language
Click the globe icon in the header
Select your preferred language
Your choice is saved for future visits
🎨 Design System
Color Palette (Cool Tones)
Primary: Indigo 500 (#6366f1) - Main actions and highlights
Accent: Sky 500 (#0ea5e9) - Secondary actions and time indicators
Secondary: Pink 500 (#ec4899) - Heat indicators and special badges
Background: Slate 950 (#020617) - Deep dark background
Surface: Slate 800 (#1e293b) - Card backgrounds
Text: Slate 100 (#f8fafc) - Primary text
Text Muted: Slate 400 (#94a3b8) - Secondary text
 Effects
Card hover with  tilt transformation
Parallax image zoom on hover
Glowing shadow effects
Gradient background animations
Smooth scale transitions
Typography
Headings: Outfit or Montserrat (Modern geometric sans-serif)
Body: Inter (High readability)
📝 Data Source
Recipe Data: All 16 recipes are mock data in JSON format
Images: High-quality food photography from Unsplash
Cuisine Variety: Includes Italian, Mexican, Thai, French, Asian, and Mediterranean recipes
Dietary Options: Vegetarian, Vegan, Gluten-Free, Keto, High Protein, Dairy-Free
🔧 Customization
Adding New Recipes
Add new recipe objects to src/data/recipes.json:

json
{
  "id": 17,
  "title": "Recipe Name",
  "shortDescription": "A brief description",
  "fullDescription": "A detailed description of the dish",
  "image": "https://images.unsplash.com/photo-...",
  "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
  "tags": ["tag1", "tag2", "tag3"],
  "dietary": ["vegetarian", "gluten-free"],
  "time": 30,
  "difficulty": "Easy",
  "calories": 400,
  "protein": 20,
  "carbs": 45,
  "fat": 15,
  "instructions": [
    "Step 1: Do something",
    "Step 2: Do something else"
  ],
  "tips": "Cooking tips and tricks"
}
Adding New Languages
Edit src/i18n.js to add new language translations:

javascript
const messages = {
  de: {
    app: {
      title: 'DishDiscovery ',
      subtitle: 'Intelligenter Rezeptfinder'
    },
    pantry: {
      title: 'Wählen Sie Ihre Zutaten',
      // ... more translations
    }
  }
}
Customizing Colors
Modify tailwind.config.js to change the color scheme:

javascript
colors: {
  primary: {
'#your-color-code',
  },
  accent: {
'#your-color-code',
  }
}
📄 License
MIT License - Feel free to use this project for personal or commercial purposes.

Made by DevNova team 