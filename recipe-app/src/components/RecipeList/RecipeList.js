import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { setRecipes, setLoading, setError } from '../../redux/recipeSlice';
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import { ChefHat, SearchX } from 'lucide-react';

const APP_ID = 'a5de3521';
const APP_KEY = '28f8a20bd893e2740e68d4bbb349b977';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { 
    searchQuery, 
    filters, 
    recipes, 
    selectedRecipe, 
    isLoading, 
    error,
    sortBy,
    viewMode 
  } = useSelector((state) => state.recipes);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        dispatch(setLoading(true));
        
        // Build query with all filters
        const filterParts = [
          searchQuery,
          filters.mealType,
          filters.cuisine,
          filters.dietary,
        ].filter(Boolean);
        
        const query = filterParts.join(' ').trim();

        if (!query) {
          dispatch(setRecipes([]));
          return;
        }

        // Build API URL with filters
        let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=30`;
        
        if (filters.maxCalories) {
          url += `&calories=0-${filters.maxCalories}`;
        }

        const response = await axios.get(url);
        dispatch(setRecipes(response.data.hits || []));
      } catch (error) {
        console.error('Error fetching recipes:', error);
        dispatch(setError(error.message || 'Failed to fetch recipes'));
        dispatch(setRecipes([]));
      }
    };

    const debounce = setTimeout(() => {
      fetchRecipes();
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery, filters, dispatch]);

  // Sort recipes
  const sortedRecipes = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];
    
    const sorted = [...recipes];
    
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.recipe.label.localeCompare(b.recipe.label));
      case 'name-desc':
        return sorted.sort((a, b) => b.recipe.label.localeCompare(a.recipe.label));
      case 'calories-asc':
        return sorted.sort((a, b) => {
          const caloriesA = a.recipe.calories / (a.recipe.yield || 1);
          const caloriesB = b.recipe.calories / (b.recipe.yield || 1);
          return caloriesA - caloriesB;
        });
      case 'calories-desc':
        return sorted.sort((a, b) => {
          const caloriesA = a.recipe.calories / (a.recipe.yield || 1);
          const caloriesB = b.recipe.calories / (b.recipe.yield || 1);
          return caloriesB - caloriesA;
        });
      case 'time-asc':
        return sorted.sort((a, b) => {
          const timeA = a.recipe.totalTime || 30;
          const timeB = b.recipe.totalTime || 30;
          return timeA - timeB;
        });
      default:
        return sorted;
    }
  }, [recipes, sortBy]);

  // Grid layout classes based on view mode
  const gridClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    list: 'flex flex-col gap-4',
    compact: 'grid grid-cols-1 md:grid-cols-2 gap-3',
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {selectedRecipe ? (
        <RecipeDetails />
      ) : (
        <>
          {isLoading ? (
            <div className={gridClasses[viewMode]}>
              <LoadingSkeleton
                count={viewMode === 'compact' ? 8 : viewMode === 'list' ? 6 : 9}
                variant={viewMode === 'list' ? 'list' : 'card'}
              />
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {error}
              </p>
            </motion.div>
          ) : sortedRecipes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={gridClasses[viewMode]}
            >
              {sortedRecipes.map((recipe, index) => (
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
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                No recipes found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Try adjusting your search or filters to find what you're looking for
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeList;
