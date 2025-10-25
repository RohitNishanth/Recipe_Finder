import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Grid3x3, 
  List, 
  LayoutGrid,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { 
  setSearchQuery, 
  setFilters, 
  clearFilters, 
  setSortBy, 
  setViewMode 
} from '../../redux/recipeSlice';
import Button from '../ui/Button';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  const { filters, sortBy, viewMode } = useSelector((state) => state.recipes);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(setSearchQuery(input));
    }
  };

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilters({ [filterName]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-8">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="luxury-card p-4"
      >
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="search"
              placeholder="Search for recipes, ingredients, cuisines..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-luxury pl-12 pr-4"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            disabled={!input.trim()}
            icon={Sparkles}
          >
            Search
          </Button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`relative px-4 py-3 rounded-xl font-semibold transition-all ${
              showFilters
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-600'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {activeFiltersCount}
              </span>
            )}
          </motion.button>
        </form>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Meal Type */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                      Meal Type
                    </label>
                    <select
                      value={filters.mealType}
                      onChange={(e) => handleFilterChange('mealType', e.target.value)}
                      className="input-luxury"
                    >
                      <option value="">All Meals</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                      <option value="dessert">Dessert</option>
                    </select>
                  </div>

                  {/* Cuisine */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                      Cuisine
                    </label>
                    <select
                      value={filters.cuisine}
                      onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                      className="input-luxury"
                    >
                      <option value="">All Cuisines</option>
                      <option value="italian">Italian</option>
                      <option value="mexican">Mexican</option>
                      <option value="asian">Asian</option>
                      <option value="indian">Indian</option>
                      <option value="mediterranean">Mediterranean</option>
                      <option value="american">American</option>
                    </select>
                  </div>

                  {/* Dietary */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                      Dietary
                    </label>
                    <select
                      value={filters.dietary}
                      onChange={(e) => handleFilterChange('dietary', e.target.value)}
                      className="input-luxury"
                    >
                      <option value="">No Restrictions</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="gluten-free">Gluten-Free</option>
                      <option value="keto">Keto</option>
                      <option value="paleo">Paleo</option>
                    </select>
                  </div>

                  {/* Max Calories */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                      Max Calories
                    </label>
                    <select
                      value={filters.maxCalories}
                      onChange={(e) => handleFilterChange('maxCalories', e.target.value)}
                      className="input-luxury"
                    >
                      <option value="">Any</option>
                      <option value="300">Under 300</option>
                      <option value="500">Under 500</option>
                      <option value="700">Under 700</option>
                      <option value="1000">Under 1000</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    icon={X}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* View Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap items-center justify-between gap-4 mt-4"
      >
        {/* Sort By */}
        <div className="flex items-center gap-3">
          <ArrowUpDown className="w-5 h-5 text-neutral-500" />
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 outline-none transition-all"
          >
            <option value="relevance">Most Relevant</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="calories-asc">Calories (Low to High)</option>
            <option value="calories-desc">Calories (High to Low)</option>
            <option value="time-asc">Cooking Time (Fast First)</option>
          </select>
        </div>

        {/* View Mode */}
        <div className="flex items-center gap-2 glass-effect px-2 py-2 rounded-xl">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(setViewMode('grid'))}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(setViewMode('list'))}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }`}
          >
            <List className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(setViewMode('compact'))}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'compact'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchBar;
