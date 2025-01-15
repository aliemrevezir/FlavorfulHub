import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  recipeCount: number;
  icon: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/categories/${category.id}`}
      className="block transform transition-transform duration-200 hover:-translate-y-1"
    >
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full bg-surface rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
      >
        {/* Image */}
        <div className="aspect-video relative">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-primary/90 backdrop-blur rounded-lg text-xl">
            {category.icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-text-secondary line-clamp-2">
              {category.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-text-secondary">
              {category.recipeCount} recipes
            </span>
            <ArrowRight className="w-5 h-5 text-primary" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default CategoryCard; 