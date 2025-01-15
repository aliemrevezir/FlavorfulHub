import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Clock, ChefHat, Users, X, ArrowUpDown } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalPosition {
  top: number;
  left: number;
  transformOrigin: string;
}

interface FilterOptionsProps {
  filters: {
    time: string;
    difficulty: string;
    servings: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onSortChange?: (value: string) => void;
  currentSort?: string;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ 
  filters, 
  onFilterChange,
  onSortChange,
  currentSort = 'none'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition>({
    top: 0,
    left: 0,
    transformOrigin: 'top'
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const cookingTimes = ['Any', '< 15 mins', '15-30 mins', '30-60 mins', '> 60 mins'];
  const difficultyLevels = ['Any', 'Easy', 'Medium', 'Hard'];
  const servingSizes = ['Any', '1-2', '3-4', '5-6', '7+'];
  const sortOptions = [
    { value: 'none', label: 'Default' },
    { value: 'difficulty-asc', label: 'Difficulty: Easy to Hard' },
    { value: 'difficulty-desc', label: 'Difficulty: Hard to Easy' },
  ];

  const activeFiltersCount = Object.values(filters).filter(value => value !== 'Any').length;

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy':
        return 'text-green-500 bg-green-500/10 hover:bg-green-500/20';
      case 'Medium':
        return 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20';
      case 'Hard':
        return 'text-red-500 bg-red-500/10 hover:bg-red-500/20';
      default:
        return 'bg-background hover:bg-primary/10';
    }
  };

  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current && isOpen) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const modalWidth = 400; // maxWidth of modal
        
        // Calculate available space below the button
        const spaceBelow = window.innerHeight - buttonRect.bottom - 8;
        const spaceAbove = buttonRect.top - 8;
        const modalHeight = Math.min(600, window.innerHeight - 40); // Max height or viewport height - padding
        
        let top = buttonRect.bottom + 8;
        let transformOrigin = 'top';

        // If there's not enough space below and more space above, position above
        if (spaceBelow < modalHeight && spaceAbove > spaceBelow) {
          top = buttonRect.top - 8;
          transformOrigin = 'bottom';
        }

        // Calculate left position to prevent overflow
        let left = buttonRect.left;
        if (left + modalWidth > window.innerWidth) {
          left = window.innerWidth - modalWidth - 16; // 16px padding from window edge
        }

        setModalPosition({
          top,
          left: Math.max(16, left), // Ensure at least 16px from left edge
          transformOrigin,
        });
      }
    };

    updatePosition();
    if (isOpen) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  const renderModal = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: 9998 }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            style={{
              position: 'fixed',
              top: modalPosition.top,
              left: modalPosition.left,
              width: '100%',
              maxWidth: '400px',
              maxHeight: 'min(600px, calc(100vh - 40px))',
              transformOrigin: modalPosition.transformOrigin,
              zIndex: 9999
            }}
            className="bg-surface border border-border rounded-xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-background/50">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Filter & Sort Recipes</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-surface rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6 overflow-y-auto flex-1">
              {/* Sort Options */}
              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-text">
                  <ArrowUpDown className="w-4 h-4 text-primary" />
                  <span className="font-medium">Sort By</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {sortOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => onSortChange?.(option.value)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                        currentSort === option.value
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-background hover:bg-primary/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                      {currentSort === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
                  {Object.entries(filters).map(([key, value]) => 
                    value !== 'Any' && (
                      <motion.div
                        key={key}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`flex items-center gap-1.5 px-2 py-1 text-sm rounded-lg ${
                          key === 'difficulty' ? getDifficultyColor(value) : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <span>{value}</span>
                        <button
                          onClick={() => onFilterChange(key, 'Any')}
                          className="p-0.5 hover:bg-black/10 rounded-full transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    )
                  )}
                </div>
              )}

              {/* Cooking Time Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-text">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">Cooking Time</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cookingTimes.map((time) => (
                    <motion.button
                      key={time}
                      onClick={() => onFilterChange('time', time)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        filters.time === time
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-background hover:bg-primary/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-text">
                  <ChefHat className="w-4 h-4 text-primary" />
                  <span className="font-medium">Difficulty Level</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {difficultyLevels.map((level) => (
                    <motion.button
                      key={level}
                      onClick={() => onFilterChange('difficulty', level)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        level !== 'Any' ? getDifficultyColor(level) : 'bg-background hover:bg-primary/10'
                      } ${
                        filters.difficulty === level
                          ? 'ring-2 ring-offset-2 ring-primary shadow-sm'
                          : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Serving Size Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-text">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">Serving Size</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {servingSizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => onFilterChange('servings', size)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        filters.servings === size
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-background hover:bg-primary/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-border bg-background/50">
              <button
                onClick={() => {
                  Object.keys(filters).forEach(key => onFilterChange(key, 'Any'));
                  onSortChange?.('none');
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-background transition-colors"
      >
        <Sliders className="w-5 h-5" />
        <span className="font-medium">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {createPortal(renderModal(), document.body)}
    </div>
  );
};

export default FilterOptions; 