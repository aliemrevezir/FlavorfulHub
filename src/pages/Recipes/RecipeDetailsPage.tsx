import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import RecipeDetails from '../../components/Recipes/RecipeDetails';
import { dummyRecipes } from './index';
import type { Recipe } from '../../components/Recipes/RecipeCard';

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = dummyRecipes.find((r: Recipe) => r.id === id);

  const handleBack = () => {
    navigate(-1);
  };

  if (!recipe) {
    return (
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center space-y-4"
        >
          <h1 className="text-2xl font-bold text-text-secondary">Recipe not found</h1>
          <p className="text-text-secondary">
            The recipe you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to recipes
        </button>
      </motion.div>
      <RecipeDetails recipe={recipe} />
    </div>
  );
};

export default RecipeDetailsPage; 