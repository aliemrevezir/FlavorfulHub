import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, Star,  Share2, Heart } from 'lucide-react';
import { Recipe } from './RecipeCard';

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Recipe Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {recipe.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                <span>{recipe.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{recipe.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
            >
              <Heart className="w-4 h-4" />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
          </div>
          <div className="flex items-center gap-6 text-text-secondary">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-text-secondary">
          {recipe.description}
        </p>

        {/* Ingredients Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Ingredients</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* This would come from the API */}
            <li className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>2 cups all-purpose flour</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>1 cup milk</span>
            </li>
            {/* Add more ingredients */}
          </ul>
        </section>

        {/* Instructions Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Instructions</h2>
          <ol className="space-y-6">
            {/* This would come from the API */}
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-bold">
                1
              </div>
              <div className="flex-grow pt-1">
                <p>Preheat the oven to 350°F (175°C). Grease and flour a 9x13 inch pan.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-bold">
                2
              </div>
              <div className="flex-grow pt-1">
                <p>In a large bowl, combine the flour, sugar, and baking powder.</p>
              </div>
            </li>
            {/* Add more instructions */}
          </ol>
        </section>

        {/* Tips Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Chef's Tips</h2>
          <div className="bg-surface border border-border rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-primary rounded-full" />
                <p>For best results, make sure all ingredients are at room temperature.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-primary rounded-full" />
                <p>You can substitute milk with almond milk for a dairy-free version.</p>
              </li>
              {/* Add more tips */}
            </ul>
          </div>
        </section>

        {/* Nutrition Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Nutrition Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-primary">250</div>
              <div className="text-sm text-text-secondary">Calories</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-primary">6g</div>
              <div className="text-sm text-text-secondary">Protein</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-primary">30g</div>
              <div className="text-sm text-text-secondary">Carbs</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-primary">12g</div>
              <div className="text-sm text-text-secondary">Fat</div>
            </div>
          </div>
        </section>
      </motion.div>
    </article>
  );
};

export default RecipeDetails; 