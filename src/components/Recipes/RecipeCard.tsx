import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  servings: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  author: {
    name: string;
    avatar: string;
  };
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link 
      to={`/recipes/${recipe.id}`}
      className="block transform transition-transform duration-200 hover:-translate-y-1"
    >
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-surface rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
      >
        {/* Image */}
        <div className="aspect-video relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-sm rounded">
            ⭐ {recipe.rating}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">{recipe.title}</h3>
            <p className="text-text-secondary text-sm line-clamp-2">
              {recipe.description}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{recipe.servings}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <img
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{recipe.author.name}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default RecipeCard; 