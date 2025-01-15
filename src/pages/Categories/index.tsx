import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, SlidersHorizontal } from 'lucide-react';
import CategoryCard, { Category } from '../../components/Categories/CategoryCard';
import SearchBar from '../../components/Categories/SearchBar';
import { STORAGE_KEYS } from '../../utils/constants';
import { dummyRecipes } from '../Recipes';

// Calculate recipe counts for each category
const getRecipeCount = (categoryId: string) => {
  return dummyRecipes.filter(recipe => recipe.category === categoryId).length;
};

export const dummyCategories: Category[] = [
  {
    id: 'italian',
    name: 'Italian',
    description: 'Classic Mediterranean flavors with pasta, pizza, and more.',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    recipeCount: getRecipeCount('italian'),
    icon: '🍝'
  },
  {
    id: 'asian',
    name: 'Asian',
    description: 'Diverse flavors from East and Southeast Asia.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    recipeCount: getRecipeCount('asian'),
    icon: '🥢'
  },
  {
    id: 'mexican',
    name: 'Mexican',
    description: 'Spicy and flavorful dishes from Mexico.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    recipeCount: getRecipeCount('mexican'),
    icon: '🌮'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats and baked delights.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    recipeCount: getRecipeCount('desserts'),
    icon: '🍰'
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    description: 'Healthy and delicious meat-free recipes.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    recipeCount: getRecipeCount('vegetarian'),
    icon: '🥗'
  },
  {
    id: 'seafood',
    name: 'Seafood',
    description: 'Fresh and flavorful dishes from the sea.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    recipeCount: getRecipeCount('seafood'),
    icon: '🐟'
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    description: 'Start your day with these delicious recipes.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    recipeCount: getRecipeCount('breakfast'),
    icon: '🍳'
  }
];

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'recipes-asc', label: 'Recipes (Low to High)' },
  { value: 'recipes-desc', label: 'Recipes (High to Low)' },
];

// Generate suggestions from categories
const searchSuggestions = [
  ...dummyCategories.map(cat => cat.name),
  'Quick Meals',
  'Healthy Options',
  'Party Food',
  'Comfort Food',
  'Gluten Free',
  'Low Carb',
  'High Protein',
  'Budget Friendly',
  'Kid Friendly',
  'Special Occasion',
];

const CategoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredAndSortedCategories = useMemo(() => {
    let results = [...dummyCategories];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        category =>
          category.name.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'recipes-asc':
          return a.recipeCount - b.recipeCount;
        case 'recipes-desc':
          return b.recipeCount - a.recipeCount;
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, sortBy]);

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block p-3 bg-primary/10 rounded-full"
          >
            <ChefHat className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold">Recipe Categories</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our diverse collection of recipes, organized by cuisine type and meal categories.
            Find the perfect dish for any occasion.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <SearchBar
            onSearch={setSearchQuery}
            suggestions={searchSuggestions}
            placeholder="Search categories..."
            storageKey={STORAGE_KEYS.CATEGORY_SEARCH_HISTORY}
          />

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-background transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Sort By</span>
            </button>

            {/* Sort Menu */}
            {showSortMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-10"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-background transition-colors ${
                      sortBy === option.value ? 'text-primary' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-text-secondary">
          Found {filteredAndSortedCategories.length} categories
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-text-secondary text-lg">
              No categories found matching your search.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryPage; 