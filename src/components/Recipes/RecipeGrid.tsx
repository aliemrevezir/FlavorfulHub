import React from 'react';
import { motion } from 'framer-motion';
import RecipeCard, { Recipe } from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative" style={{ isolation: 'isolate' }}>
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          style={{ isolation: 'isolate' }}
        >
          <RecipeCard recipe={recipe} />
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeGrid; 