import React from 'react';
import AuthCard from '../../components/Auth/AuthCard';
import LoginForm from '../../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to your account to continue"
      >
        <LoginForm />
      </AuthCard>
    </div>
  );
};

export default LoginPage; 