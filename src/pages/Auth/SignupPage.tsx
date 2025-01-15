import React from 'react';
import AuthCard from '../../components/Auth/AuthCard';
import SignupForm from '../../components/Auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <AuthCard
        title="Create Account"
        subtitle="Join our community of food lovers"
      >
        <SignupForm />
      </AuthCard>
    </div>
  );
};

export default SignupPage; 