import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Globe } from 'lucide-react';

const AboutContent: React.FC = () => {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Our Mission',
      description: 'To inspire and empower people to cook delicious, healthy meals at home by providing easy-to-follow recipes and a supportive community.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Our Vision',
      description: 'To become the most trusted and loved recipe platform, making cooking accessible and enjoyable for everyone, regardless of their skill level.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Community',
      description: 'We celebrate diversity in cuisine and culture, bringing together recipes and cooking traditions from all corners of the world.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Our Team',
      description: 'A passionate group of food lovers, chefs, and tech enthusiasts working together to create the best possible cooking experience for our users.'
    }
  ];

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-surface p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="text-text-secondary">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-text-secondary max-w-3xl mx-auto">
          Founded in 2024, FlavorfulHub began with a simple idea: to make cooking more accessible and enjoyable for everyone. 
          What started as a small collection of family recipes has grown into a vibrant community of food lovers sharing their 
          culinary experiences and discoveries. Today, we're proud to help millions of people discover the joy of cooking and 
          create memorable meals for their loved ones.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutContent; 