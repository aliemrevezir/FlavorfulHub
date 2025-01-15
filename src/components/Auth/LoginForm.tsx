import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthInput from './AuthInput';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Here you would typically make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      // Handle successful login (e.g., store token, redirect)
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthInput
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        placeholder="me@wezirim.com"
        icon={Mail}
        onChange={handleChange}
      />

      <AuthInput
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        placeholder="••••••••"
        icon={Lock}
        onChange={handleChange}
      />

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-800 rounded-lg p-4"
        >
          {error}
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border focus:ring-primary"
          />
          <span className="text-sm">Remember me</span>
        </label>

        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 transition-colors"
      >
        {isSubmitting ? (
          'Signing in...'
        ) : (
          <>
            Sign In
            <LogIn className="w-4 h-4" />
          </>
        )}
      </motion.button>

      <p className="text-center text-text-secondary">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm; 