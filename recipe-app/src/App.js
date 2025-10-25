import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles.css';
import store from './redux/store';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import Onboarding from './components/ui/Onboarding';
import RecipeList from './components/RecipeList/RecipeList';
import Favorites from './components/Favorites/Favorites';
import Navigation from './components/Navigation/Navigation';
import SearchBar from './components/SearchBar/SearchBar';

const AppContent = () => {
  const showOnboarding = useSelector((state) => state.recipes.showOnboarding);

  return (
    <>
      <AnimatePresence>
        {showOnboarding && <Onboarding />}
      </AnimatePresence>
      
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <RecipeList />
              </>
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <Router>
            <AppContent />
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
