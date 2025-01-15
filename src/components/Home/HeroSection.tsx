import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  popularCategories: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ popularCategories }) => {
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative bg-surface py-32 overflow-hidden">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-primary/5 dark:bg-primary/10"
      />
      <div className="container-custom relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center space-y-8"
          style={{ y: textY }}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text"
          >
            Discover & Share
            <motion.span
              variants={itemVariants}
              className="text-primary block mt-2"
            >
              Delicious Recipes
            </motion.span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Join our community of food lovers and discover amazing recipes from around the world.
            Share your culinary creations and get inspired by others.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5 transition-colors group-hover:text-primary" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                type="text"
                placeholder="Search for recipes..."
                className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </motion.div>

          {/* Popular Categories */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <motion.p
              variants={itemVariants}
              className="text-text-secondary mb-4"
            >
              Popular Categories:
            </motion.p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularCategories.map((category, index) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/categories/${category.toLowerCase()}`}
                    className="px-4 py-2 rounded-full bg-surface border border-border hover:border-primary hover:text-primary transition-all"
                  >
                    {category}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 