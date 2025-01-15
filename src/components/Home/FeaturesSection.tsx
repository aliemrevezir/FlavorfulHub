import React from 'react';
import { ChefHat, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../UI/AnimatedSection';

const features = [
  {
    icon: <ChefHat className="w-6 h-6" />,
    title: "Expert Recipes",
    description: "Access thousands of professionally crafted recipes from expert chefs worldwide."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Driven",
    description: "Join a vibrant community of food lovers sharing their favorite recipes and tips."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Quick & Easy",
    description: "Find recipes that fit your schedule, from quick meals to elaborate dishes."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const FeaturesSection: React.FC = () => {
  return (
    <AnimatedSection className="py-20 bg-background" parallax>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="p-6 rounded-xl bg-surface border border-border hover:border-primary transition-all"
            >
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.1,
                }}
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4"
              >
                {feature.icon}
              </motion.div>
              <motion.h3
                className="text-xl font-semibold mb-2"
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-text-secondary"
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default FeaturesSection; 