import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../UI/AnimatedSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

const CTASection: React.FC = () => {
  return (
    <AnimatedSection className="py-20 bg-primary/5 dark:bg-primary/10" parallax direction="up">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-text"
          >
            Ready to Start Your Culinary Journey?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-secondary"
          >
            Join Flavorful Hub today and become part of our growing community of food enthusiasts.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/register"
                className="btn-primary inline-flex items-center justify-center group relative overflow-hidden"
              >
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Get Started
                </motion.span>
                <motion.span
                  className="ml-2"
                  initial={{ x: -5 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/recipes"
                className="btn-outline inline-flex items-center justify-center"
              >
                Browse Recipes
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default CTASection; 