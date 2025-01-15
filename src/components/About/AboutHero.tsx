import React from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const AboutHero: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <Utensils className="w-16 h-16 text-primary" />
        </motion.div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold">
        Welcome to FlavorfulHub
      </h1>
      
      <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
        Your ultimate destination for discovering, sharing, and creating delicious recipes from around the world.
      </p>
      
      <div className="flex justify-center gap-8 py-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">1000+</div>
          <div className="text-text-secondary">Recipes</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">50k+</div>
          <div className="text-text-secondary">Happy Cooks</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">100+</div>
          <div className="text-text-secondary">Categories</div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutHero; 