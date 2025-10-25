import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ count = 1, variant = 'card' }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <>
        {skeletons.map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="luxury-card overflow-hidden"
          >
            <div className="skeleton h-56 w-full rounded-t-2xl"></div>
            <div className="p-6 space-y-3">
              <div className="skeleton h-6 w-3/4 rounded"></div>
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-4 w-2/3 rounded"></div>
              <div className="flex gap-2 mt-4">
                <div className="skeleton h-8 w-20 rounded-lg"></div>
                <div className="skeleton h-8 w-24 rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </>
    );
  }

  if (variant === 'list') {
    return (
      <>
        {skeletons.map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="luxury-card flex gap-4 p-4"
          >
            <div className="skeleton h-24 w-24 rounded-xl flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="skeleton h-5 w-2/3 rounded"></div>
              <div className="skeleton h-4 w-full rounded"></div>
              <div className="skeleton h-4 w-1/2 rounded"></div>
            </div>
          </motion.div>
        ))}
      </>
    );
  }

  return null;
};

export default LoadingSkeleton;
