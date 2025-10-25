import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Search, Heart, Sparkles, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { completeOnboarding } from '../../redux/recipeSlice';
import Button from './Button';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();

  const steps = [
    {
      icon: ChefHat,
      title: 'Welcome to Premium Recipes',
      description: 'Discover thousands of delicious recipes from around the world with our premium recipe finder.',
      gradient: 'from-primary-500 to-accent-500',
    },
    {
      icon: Search,
      title: 'Smart Search & Filters',
      description: 'Use advanced search, filters, and sorting to find exactly what you\'re craving.',
      gradient: 'from-accent-500 to-primary-600',
    },
    {
      icon: Heart,
      title: 'Save Your Favorites',
      description: 'Mark recipes as favorites and rate them to build your personal cookbook.',
      gradient: 'from-primary-600 to-accent-400',
    },
    {
      icon: Sparkles,
      title: 'Enjoy the Experience',
      description: 'Beautiful design, smooth animations, and delightful interactions throughout.',
      gradient: 'from-accent-400 to-primary-500',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    dispatch(completeOnboarding());
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-neutral-800 rounded-3xl shadow-luxury-lg max-w-md w-full overflow-hidden"
      >
        <div className="relative">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-br ${currentStepData.gradient} p-8 text-white text-center relative overflow-hidden`}>
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <motion.div
              key={currentStep}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="inline-block"
            >
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-12 h-12" />
              </div>
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
                <p className="text-white/90">{currentStepData.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-gradient-to-r from-primary-500 to-accent-500'
                      : index < currentStep
                      ? 'w-2 bg-primary-300 dark:bg-primary-700'
                      : 'w-2 bg-neutral-300 dark:bg-neutral-600'
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                variant="primary"
                onClick={handleNext}
                className="flex-1"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
