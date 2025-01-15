import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Terms', path: '/terms' },
      { name: 'Privacy', path: '/privacy' },
    ],
    recipes: [
      { name: 'Browse All', path: '/recipes' },
      { name: 'Categories', path: '/categories' },
      { name: 'Popular', path: '/recipes/popular' },
      { name: 'Recent', path: '/recipes/recent' },
    ],
    social: [
      { name: 'Instagram', path: 'https://instagram.com' },
      { name: 'Twitter', path: 'https://twitter.com' },
      { name: 'Facebook', path: 'https://facebook.com' },
      { name: 'Pinterest', path: 'https://pinterest.com' },
    ],
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Flavorful Hub</span>
            </Link>
            <p className="text-text-secondary">
              Discover and share amazing recipes from around the world.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recipe Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recipes</h3>
            <ul className="space-y-2">
              {footerLinks.recipes.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-secondary">
              © {currentYear} Flavorful Hub. All rights reserved.
            </p>
            <p className="text-text-secondary">
              Created by{' '}
              <a
                href="https://wezirim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                wezirim.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 