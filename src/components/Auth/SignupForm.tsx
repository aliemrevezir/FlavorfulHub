import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthInput from './AuthInput';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<SignupFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      // Handle successful signup (e.g., store token, redirect)
    } catch (err) {
      setErrors({ email: 'An account with this email already exists' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthInput
        id="name"
        name="name"
        type="text"
        label="Full Name"
        value={formData.name}
        placeholder="Ali Emre Vezir"
        icon={User}
        onChange={handleChange}
        error={errors.name}
      />

      <AuthInput
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        placeholder="me@wezirim.com"
        icon={Mail}
        onChange={handleChange}
        error={errors.email}
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
        error={errors.password}
      />

      <AuthInput
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword}
        placeholder="••••••••"
        icon={Lock}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 transition-colors"
      >
        {isSubmitting ? (
          'Creating account...'
        ) : (
          <>
            Create Account
            <UserPlus className="w-4 h-4" />
          </>
        )}
      </motion.button>

      <p className="text-center text-text-secondary">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm; 