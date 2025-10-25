import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Clock, 
  Flame, 
  Users, 
  ChefHat, 
  ExternalLink, 
  CheckCircle,
  Zap,
  Apple
} from 'lucide-react';
import { clearSelectedRecipe, toggleFavorite, setRating } from '../../redux/recipeSlice';
import Modal from '../ui/Modal';
import Rating from '../ui/Rating';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
  const favorites = useSelector((state) => state.recipes.favorites);
  const ratings = useSelector((state) => state.recipes.ratings);
  const toast = useToast();

  // Handle browser back button
  useEffect(() => {
    if (selectedRecipe) {
      // Push a new history state when modal opens
      window.history.pushState({ modalOpen: true }, '');

      // Handle back button
      const handlePopState = () => {
        dispatch(clearSelectedRecipe());
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [selectedRecipe, dispatch]);

  if (!selectedRecipe) return null;

  const isFavorite = favorites.includes(selectedRecipe.uri);
  const userRating = ratings[selectedRecipe.uri] || 0;
  const calories = Math.round(selectedRecipe.calories / (selectedRecipe.yield || 1));
  const cookingTime = selectedRecipe.totalTime || 30;

  const handleClose = () => {
    // Go back in history to remove the modal state
    if (window.history.state?.modalOpen) {
      window.history.back();
    } else {
      dispatch(clearSelectedRecipe());
    }
  };

  const handleFavorite = () => {
    dispatch(toggleFavorite(selectedRecipe.uri));
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites!');
  };

  const handleRating = (rating) => {
    dispatch(setRating({ recipeUri: selectedRecipe.uri, rating }));
    toast.success(`Rated ${rating} stars!`);
  };

  const getNutritionValue = (nutrient) => {
    if (!selectedRecipe.totalNutrients || !selectedRecipe.totalNutrients[nutrient]) {
      return 'N/A';
    }
    const value = selectedRecipe.totalNutrients[nutrient];
    return `${Math.round(value.quantity / (selectedRecipe.yield || 1))}${value.unit}`;
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={handleClose}
      size="xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image & Actions */}
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-luxury-lg mb-6">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.label}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Quick Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md">
                <Clock className="w-5 h-5 text-primary-500" />
                <span className="font-bold">{cookingTime}min</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md">
                <Flame className="w-5 h-5 text-accent-500" />
                <span className="font-bold">{calories} cal</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md">
                <Users className="w-5 h-5 text-primary-500" />
                <span className="font-bold">{selectedRecipe.yield}</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            {selectedRecipe.label}
          </h2>

          {selectedRecipe.source && (
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mb-4">
              <ChefHat className="w-5 h-5" />
              <span className="font-medium">By {selectedRecipe.source}</span>
            </div>
          )}

          {/* Diet & Health Labels */}
          {(selectedRecipe.dietLabels?.length > 0 || selectedRecipe.healthLabels?.length > 0) && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Diet & Health
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedRecipe.dietLabels?.map((label, index) => (
                  <span
                    key={`diet-${index}`}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white"
                  >
                    {label}
                  </span>
                ))}
                {selectedRecipe.healthLabels?.slice(0, 5).map((label, index) => (
                  <span
                    key={`health-${index}`}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rating & Actions */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Your Rating</p>
              <Rating
                value={userRating}
                onChange={handleRating}
                size="md"
              />
            </div>
            <Button
              variant={isFavorite ? 'danger' : 'primary'}
              onClick={handleFavorite}
              icon={Heart}
            >
              {isFavorite ? 'Unfavorite' : 'Add to Favorites'}
            </Button>
          </div>

          {selectedRecipe.url && (
            <div className="mt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => window.open(selectedRecipe.url, '_blank')}
                icon={ExternalLink}
              >
                View Original Recipe
              </Button>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Ingredients */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary-500" />
              Ingredients
            </h3>
            <div className="space-y-2">
              {selectedRecipe.ingredientLines?.map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {ingredient}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nutrition Facts */}
          {selectedRecipe.totalNutrients && (
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Apple className="w-6 h-6 text-accent-500" />
                Nutrition Facts (per serving)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Calories', key: 'ENERC_KCAL', icon: Flame, color: 'text-accent-500' },
                  { label: 'Protein', key: 'PROCNT', icon: Zap, color: 'text-primary-500' },
                  { label: 'Carbs', key: 'CHOCDF', icon: Zap, color: 'text-blue-500' },
                  { label: 'Fat', key: 'FAT', icon: Zap, color: 'text-yellow-500' },
                  { label: 'Fiber', key: 'FIBTG', icon: Zap, color: 'text-green-500' },
                  { label: 'Sugar', key: 'SUGAR', icon: Zap, color: 'text-pink-500' },
                ].map(({ label, key, icon: Icon, color }) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${color}`} />
                      <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                        {label}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-neutral-900 dark:text-white">
                      {getNutritionValue(key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cuisine & Meal Type */}
          {(selectedRecipe.cuisineType || selectedRecipe.mealType) && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
              {selectedRecipe.cuisineType && (
                <div className="mb-2">
                  <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Cuisine: </span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    {selectedRecipe.cuisineType.join(', ')}
                  </span>
                </div>
              )}
              {selectedRecipe.mealType && (
                <div>
                  <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Meal Type: </span>
                  <span className="font-bold text-accent-600 dark:text-accent-400">
                    {selectedRecipe.mealType.join(', ')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RecipeDetails;
