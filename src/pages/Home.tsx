import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import CTASection from '../components/Home/CTASection';

const Home: React.FC = () => {
  const popularCategories = [
    "Italian", "Asian", "Vegetarian", "Desserts", "Quick Meals", "Healthy"
  ];

  return (
    <div className="min-h-screen">
      <HeroSection popularCategories={popularCategories} />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default Home; 