import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Clock, Flame, Users, ChefHat, ExternalLink } from 'lucide-react';
import { setSelectedRecipe, toggleFavorite, setRating } from '../../redux/recipeSlice';
import Rating from '../ui/Rating';
import { useToast } from '../ui/Toast';

const RecipeCard = ({ recipe, viewMode = 'grid' }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);
  const ratings = useSelector((state) => state.recipes.ratings);
  const toast = useToast();

  const isFavorite = favorites.includes(recipe.uri);
  const userRating = ratings[recipe.uri] || 0;
  const calories = Math.round(recipe.calories / (recipe.yield || 1));
  const cookingTime = recipe.totalTime || 30;

  const handleRecipeClick = () => {
    dispatch(setSelectedRecipe(recipe));
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(recipe.uri));
    if (!isFavorite) {
      toast.success('Added to favorites!');
    } else {
      toast.info('Removed from favorites');
    }
  };

  const handleRating = (rating) => {
    dispatch(setRating({ recipeUri: recipe.uri, rating }));
    toast.success(`Rated ${rating} stars!`);
  };

  // Grid View
  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        className="luxury-card overflow-hidden cursor-pointer group"
        onClick={handleRecipeClick}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
              isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Quick Stats */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-primary-500" />
              <span>{cookingTime}m</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-accent-500" />
              <span>{calories} cal</span>
            </div>
            {recipe.yield && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md text-xs font-semibold">
                <Users className="w-3.5 h-3.5 text-primary-500" />
                <span>{recipe.yield}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {recipe.label}
          </h3>
          
          {recipe.source && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 flex items-center gap-1">
              <ChefHat className="w-4 h-4" />
              {recipe.source}
            </p>
          )}

          {/* Diet Labels */}
          {recipe.dietLabels && recipe.dietLabels.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {recipe.dietLabels.slice(0, 3).map((label, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-700 dark:text-primary-300"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <Rating
              value={userRating}
              onChange={(rating) => {
                handleRating(rating);
              }}
              size="sm"
            />
            <motion.div
              whileHover={{ x: 5 }}
              className="text-primary-600 dark:text-primary-400 text-sm font-semibold flex items-center gap-1"
            >
              View Recipe
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // List View
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 4 }}
        className="luxury-card overflow-hidden cursor-pointer group flex gap-4 p-4"
        onClick={handleRecipeClick}
      >
        {/* Image */}
        <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {recipe.label}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            {recipe.source}
          </p>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>{cookingTime}m</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Flame className="w-4 h-4 text-accent-500" />
              <span>{calories} cal</span>
            </div>
            {recipe.yield && (
              <div className="flex items-center gap-1 text-sm">
                <Users className="w-4 h-4 text-primary-500" />
                <span>{recipe.yield} servings</span>
              </div>
            )}
          </div>

          <Rating
            value={userRating}
            onChange={handleRating}
            size="sm"
          />
        </div>
      </motion.div>
    );
  }

  // Compact View
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="luxury-card overflow-hidden cursor-pointer group p-3"
      onClick={handleRecipeClick}
    >
      <div className="flex gap-3">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-neutral-900 dark:text-white text-sm mb-1 line-clamp-2">
            {recipe.label}
          </h4>
          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {cookingTime}m
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {calories}
            </span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteToggle}
          className={`self-start p-1.5 rounded-lg ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
