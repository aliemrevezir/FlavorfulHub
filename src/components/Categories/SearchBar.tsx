import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock,  ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: string[];
  placeholder?: string;
  storageKey: string;
}

const MAX_HISTORY_ITEMS = 5;

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  suggestions,
  placeholder = 'Search...',
  storageKey
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem(storageKey);
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, [storageKey]);

  // Save search history to localStorage
  const saveToHistory = (searchQuery: string) => {
    const newHistory = [
      searchQuery,
      ...searchHistory.filter(item => item !== searchQuery)
    ].slice(0, MAX_HISTORY_ITEMS);
    
    setSearchHistory(newHistory);
    localStorage.setItem(storageKey, JSON.stringify(newHistory));
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveToHistory(searchQuery.trim());
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <div ref={searchBarRef} className="relative flex-grow">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
        />
      </div>

      <AnimatePresence>
        {showSuggestions && (query.trim() || searchHistory.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-20"
          >
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-2 py-1 text-sm text-text-secondary">
                  <span className="font-medium">Recent Searches</span>
                  <button
                    onClick={clearHistory}
                    className="text-xs hover:text-primary transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                {searchHistory.map((item, index) => (
                  <button
                    key={`history-${index}`}
                    onClick={() => {
                      setQuery(item);
                      handleSearch(item);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-background transition-colors rounded-md"
                  >
                    <Clock className="w-4 h-4 text-text-secondary" />
                    <span className="flex-grow text-left">{item}</span>
                    <ArrowRight className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {/* Live Suggestions */}
            {query.trim() && filteredSuggestions.length > 0 && (
              <div className={`p-2 ${searchHistory.length > 0 ? 'border-t border-border' : ''}`}>
                <div className="px-2 py-1 text-sm font-medium text-text-secondary">
                  Suggestions
                </div>
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={`suggestion-${index}`}
                    onClick={() => {
                      setQuery(suggestion);
                      handleSearch(suggestion);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-background transition-colors rounded-md group"
                  >
                    <Search className="w-4 h-4 text-text-secondary" />
                    <span className="flex-grow text-left">{suggestion}</span>
                    <ArrowRight className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.trim() && filteredSuggestions.length === 0 && (
              <div className="p-4 text-center text-text-secondary">
                No suggestions found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar; 