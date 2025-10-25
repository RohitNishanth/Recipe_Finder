import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Rating = ({ value = 0, onChange, readonly = false, size = 'md' }) => {
  const [hoverValue, setHoverValue] = useState(0);
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {stars.map((star) => {
        const isFilled = (hoverValue || value) >= star;
        
        return (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: readonly ? 1 : 1.1 }}
            whileTap={{ scale: readonly ? 1 : 0.9 }}
            onClick={() => !readonly && onChange && onChange(star)}
            onMouseEnter={() => !readonly && setHoverValue(star)}
            onMouseLeave={() => !readonly && setHoverValue(0)}
            disabled={readonly}
            className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <Star
              className={`${sizes[size]} transition-colors ${
                isFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-neutral-300 dark:text-neutral-600'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default Rating;
