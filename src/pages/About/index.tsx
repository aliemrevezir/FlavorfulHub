import React from 'react';
import { motion } from 'framer-motion';
import AboutHero from '../../components/About/AboutHero';
import AboutContent from '../../components/About/AboutContent';
import ContactForm from '../../components/About/ContactForm';

const AboutPage: React.FC = () => {
  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <AboutHero />
        <AboutContent />
        <ContactForm />
      </motion.div>
    </div>
  );
};

export default AboutPage; 