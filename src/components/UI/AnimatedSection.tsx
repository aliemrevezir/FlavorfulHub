import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  parallax?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const sectionVariants: Variants = {
  hidden: (direction: 'up' | 'down' | 'left' | 'right') => ({
    opacity: 0,
    y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smoother animation
    },
  },
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  parallax = false,
  direction = 'up',
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [0, -50] : [0, 0]
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={sectionVariants}
      custom={direction}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={parallax ? { y } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 