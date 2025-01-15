import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-surface border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">{'<Flavorful Hub>'}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-text-secondary hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-primary hover:bg-opacity-10 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </button>

            {/* Auth Buttons */}
            <Link to="/login" className="btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-primary hover:bg-opacity-10 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-text" />
              ) : (
                <Menu className="w-6 h-6 text-text" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-text-secondary hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-primary hover:bg-opacity-10 transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-primary" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary" />
                  )}
                </button>
                <div className="flex space-x-4">
                  <Link to="/login" className="btn-outline">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 