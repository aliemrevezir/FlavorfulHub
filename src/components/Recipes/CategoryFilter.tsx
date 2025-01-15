import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const categories: Category[] = [
  { id: 'all', name: 'All Recipes', icon: '🍳' },
  { id: 'italian', name: 'Italian', icon: '🍝' },
  { id: 'asian', name: 'Asian', icon: '🍜' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'vegetarian', name: 'Vegetarian', icon: '🥗' },
  { id: 'seafood', name: 'Seafood', icon: '🦐' },
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`
              px-4 py-2 rounded-full border transition-all
              ${
                selectedCategory === category.id
                  ? 'bg-primary text-white border-primary'
                  : 'border-border hover:border-primary hover:text-primary'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 