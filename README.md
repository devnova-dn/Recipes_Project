# 🍽️ DishDiscovery 3D - Smart Recipe Finder

一个基于 Vue 3 的智能食谱发现应用，帮助您根据家中已有的食材发现完美匹配的食谱。

## ✨ 功能特性

### 🔍 智能匹配系统
- **食材选择**：从丰富的食材库中选择您家中已有的食材
- **智能匹配算法**：根据选择的食材自动计算匹配百分比，优先显示最佳匹配食谱
- **匹配度显示**：每个食谱卡片显示匹配百分比和缺少的食材

### 🎨 现代 UI 设计
- **3D 视觉效果**：卡片悬停时的 3D 倾斜和浮雕效果
- **流畅动画**：页面过渡、列表动画和按钮悬停效果
- **暗色主题**：护眼的深色配色方案，使用冷色调（蓝色、紫色、粉色）
- **毛玻璃效果**：现代化的半透明背景设计

### 🔧 筛选与搜索
- **饮食偏好筛选**：素食、纯素、无麸质、生酮等
- **难度筛选**：简单、中等、困难
- **时间筛选**：20分钟内、20-40分钟、40分钟以上
- **关键词搜索**：按名称、标签搜索食谱

### 📱 响应式设计
- 完全适配桌面端和移动端
- 移动端优化的布局和交互
- 触屏友好的界面元素

## 🛠️ 技术栈

- **Vue 3** - 使用 Composition API
- **Pinia** - 状态管理
- **Vue Router** - 路由管理
- **Tailwind CSS** - 样式框架
- **Vite** - 构建工具

## 📦 安装与运行

### 1. 安装依赖

```bash
cd dishdiscovery
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
dishdiscovery/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── IngredientSelector.vue  # 食材选择器组件
│   │   ├── Filters.vue              # 筛选器组件
│   │   ├── RecipeCard.vue           # 食谱卡片组件
│   │   ├── RecipeList.vue           # 食谱列表组件
│   │   └── RecipeDetail.vue         # 食谱详情弹窗
│   ├── data/
│   │   └── recipes.json             # 模拟食谱数据
│   ├── stores/
│   │   ├── pantryStore.js           # 食材库存状态管理
│   │   └── recipeStore.js           # 食谱状态管理
│   ├── views/
│   │   ├── Home.vue                 # 首页
│   │   └── RecipeDetailPage.vue     # 食谱详情页
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎯 使用指南

### 1. 选择食材
- 在左侧面板中搜索并点击食材进行选择
- 使用快速添加分类快速选择常用食材组合
- 选中后会显示匹配百分比最高的食谱

### 2. 查看食谱
- 点击任意食谱卡片查看详情
- 在详情页查看完整的食材清单和烹饪步骤
- 已选中的食材会高亮显示

### 3. 筛选结果
- 使用筛选器缩小搜索范围
- 支持多选饮食偏好和难度
- 按烹饪时间快速筛选

## 🎨 设计说明

### 配色方案（冷色调）
- **主色**：Indigo 500 (#6366f1)
- **强调色**：Sky 500 (#0ea5e9)
- **辅助色**：Pink 500 (#ec4899)
- **背景**：Slate 950 (#020617)
- **卡片**：Slate 800 (#1e293b)

### 3D 效果
- 卡片悬停时产生 3D 倾斜效果
- 图片缩放动画
- 发光阴影效果
- 渐变背景动画

## 📝 数据来源

- 所有食谱数据均为模拟数据（JSON 格式）
- 食谱图片来自 Unsplash
- 包含 16 道精选食谱，涵盖多种菜系和饮食需求

## 🔧 自定义

### 添加新食谱
在 `src/data/recipes.json` 中添加新食谱对象：

```json
{
  "id": 17,
  "title": "新食谱名称",
  "shortDescription": "简短描述",
  "fullDescription": "完整描述",
  "image": "图片URL",
  "ingredients": ["食材1", "食材2"],
  "tags": ["标签1", "标签2"],
  "dietary": ["dietary标签"],
  "time": 30,
  "difficulty": "Easy",
  "calories": 400,
  "protein": 20,
  "carbs": 45,
  "fat": 15,
  "instructions": ["步骤1", "步骤2"],
  "tips": "烹饪小贴士"
}
```

### 自定义颜色
在 `tailwind.config.js` 中修改颜色配置：

```javascript
colors: {
  primary: {
    500: '#your-color',
  },
  // ...
}
```

## 📄 许可证

MIT License

---

**Made with ❤️ by MiniMax Agent**
# Recipes_Project
