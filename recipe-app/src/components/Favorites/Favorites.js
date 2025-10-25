import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeDetails from '../RecipeDetails/RecipeDetails';

const Favorites = () => {
  const { recipes, favorites, viewMode, selectedRecipe } = useSelector((state) => state.recipes);

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.recipe.uri)
  );

  const gridClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    list: 'flex flex-col gap-4',
    compact: 'grid grid-cols-1 md:grid-cols-2 gap-3',
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pb-12">
      {selectedRecipe ? (
        <RecipeDetails />
      ) : (
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold text-gradient">
                  Your Favorites
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          {favoriteRecipes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={gridClasses[viewMode]}
            >
              {favoriteRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.recipe.uri}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <RecipeCard recipe={recipe.recipe} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
                No favorites yet
              </h3>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                Start exploring recipes and click the heart icon to save your favorites!
              </p>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Discover Recipes
              </motion.a>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
