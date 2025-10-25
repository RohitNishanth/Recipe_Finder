import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Heart, Home, Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const favorites = useSelector((state) => state.recipes.favorites);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect shadow-luxury'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gradient">
                Premium Recipes
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                World-Class Culinary Experience
              </p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <NavLink to="/">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="hidden sm:inline">Home</span>
                </motion.div>
              )}
            </NavLink>

            <NavLink to="/favorites">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="hidden sm:inline">Favorites</span>
                  {favorites.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                    >
                      {favorites.length}
                    </motion.span>
                  )}
                </motion.div>
              )}
            </NavLink>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors shadow-md"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
