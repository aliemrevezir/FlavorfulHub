import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Utensils } from 'lucide-react';
import RecipeGrid from '../../components/Recipes/RecipeGrid';
import { dummyRecipes } from '../Recipes';
import { dummyCategories } from './index';

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const category = dummyCategories.find(c => c.id === id);

  const categoryRecipes = useMemo(() => {
    return dummyRecipes.filter(recipe => recipe.category === id);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!category) {
    return (
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center space-y-4"
        >
          <h1 className="text-2xl font-bold text-text-secondary">Category not found</h1>
          <p className="text-text-secondary">
            The category you're looking for doesn't exist or has been removed.
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to categories
        </motion.button>

        {/* Hero Section */}
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 text-white mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/90 rounded-lg text-xl">
                {category.icon}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
            </div>
            <p className="text-white/90 text-lg max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex items-center justify-between p-6 bg-surface border border-border rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{categoryRecipes.length}</div>
            <div className="text-text-secondary">Recipes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(categoryRecipes.reduce((acc, recipe) => acc + recipe.rating, 0) / categoryRecipes.length * 10) / 10}
            </div>
            <div className="text-text-secondary">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(categoryRecipes.reduce((acc, recipe) => acc + parseInt(recipe.prepTime), 0) / categoryRecipes.length)}
            </div>
            <div className="text-text-secondary">Avg Time (mins)</div>
          </div>
        </div>

        {/* Recipes Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">All {category.name} Recipes</h2>
          {categoryRecipes.length > 0 ? (
            <RecipeGrid recipes={categoryRecipes} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Utensils className="w-12 h-12 text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary text-lg">
                No recipes found in this category yet.
              </p>
            </motion.div>
          )}
        </section>
      </motion.div>
    </div>
  );
};

export default CategoryDetailPage; 