import React from 'react';
import { motion } from 'framer-motion';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-surface p-8 rounded-xl shadow-lg border border-border"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-text-secondary">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
};

export default AuthCard; 