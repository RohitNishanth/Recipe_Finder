import { createSlice } from "@reduxjs/toolkit";

// Load favorites from localStorage
const loadFavoritesFromStorage = () => {
  try {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    return [];
  }
};

// Load ratings from localStorage
const loadRatingsFromStorage = () => {
  try {
    const savedRatings = localStorage.getItem('recipeRatings');
    return savedRatings ? JSON.parse(savedRatings) : {};
  } catch (error) {
    return {};
  }
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    filteredRecipes: [],
    searchQuery: "popular", // Default search query to show recipes on initial load
    filters: {
      category: "",
      dietary: "",
      cuisine: "",
      maxCalories: "",
      mealType: "",
    },
    sortBy: "relevance", // relevance, calories-asc, calories-desc, time-asc, time-desc, name-asc, name-desc
    viewMode: "grid", // grid, list, compact
    favorites: loadFavoritesFromStorage(),
    ratings: loadRatingsFromStorage(), // { recipeUri: rating }
    selectedRecipe: null,
    isLoading: false,
    error: null,
    showOnboarding: !localStorage.getItem('onboardingCompleted'),
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setRecipes(state, action) {
      state.recipes = action.payload;
      state.filteredRecipes = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = {
        category: "",
        dietary: "",
        cuisine: "",
        maxCalories: "",
        mealType: "",
      };
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    toggleFavorite(state, action) {
      const recipeId = action.payload;
      if (state.favorites.includes(recipeId)) {
        state.favorites = state.favorites.filter((id) => id !== recipeId);
      } else {
        state.favorites.push(recipeId);
      }
      // Save to localStorage
      localStorage.setItem('recipeFavorites', JSON.stringify(state.favorites));
    },
    setRating(state, action) {
      const { recipeUri, rating } = action.payload;
      state.ratings[recipeUri] = rating;
      // Save to localStorage
      localStorage.setItem('recipeRatings', JSON.stringify(state.ratings));
    },
    setSelectedRecipe(state, action) {
      state.selectedRecipe = action.payload;
    },
    clearSelectedRecipe(state) {
      state.selectedRecipe = null;
    },
    completeOnboarding(state) {
      state.showOnboarding = false;
      localStorage.setItem('onboardingCompleted', 'true');
    },
  },
});

export const {
  setSearchQuery,
  setRecipes,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  setSortBy,
  setViewMode,
  toggleFavorite,
  setRating,
  setSelectedRecipe,
  clearSelectedRecipe,
  completeOnboarding,
} = recipeSlice.actions;

export default recipeSlice.reducer;
