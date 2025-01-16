import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import CategoryFilter from '../../components/Recipes/CategoryFilter';
import FilterOptions from '../../components/Recipes/FilterOptions';
import RecipeGrid from '../../components/Recipes/RecipeGrid';
import SearchBar from '../../components/Categories/SearchBar';
import { Recipe } from '../../components/Recipes/RecipeCard';
import { RECIPE_SEARCH_SUGGESTIONS, STORAGE_KEYS } from '../../utils/constants';

// Export the dummy recipes data
export const dummyRecipes: Recipe[] = [
  // Italian Recipes
  {
    id: '1',
    title: 'Classic Italian Pasta Carbonara',
    description: 'Creamy pasta dish with pancetta, eggs, and Pecorino Romano cheese. A true Roman classic!',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'italian',
    prepTime: '30 mins',
    servings: 4,
    rating: 4.8,
    difficulty: 'Medium',
    author: {
      name: 'Chef Marco',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    id: '2',
    title: 'Homemade Margherita Pizza',
    description: 'Traditional Neapolitan pizza with fresh mozzarella, tomatoes, and basil.',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'italian',
    prepTime: '40 mins',
    servings: 4,
    rating: 4.9,
    difficulty: 'Medium',
    author: {
      name: 'Isabella Romano',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    },
  },
  {
    id: '3',
    title: 'Creamy Risotto ai Funghi',
    description: 'Rich and creamy mushroom risotto made with arborio rice and porcini mushrooms.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826a07f',
    category: 'italian',
    prepTime: '45 mins',
    servings: 4,
    rating: 4.7,
    difficulty: 'Hard',
    author: {
      name: 'Giuseppe Rossi',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
  },
  {
    id: '19',
    title: 'Osso Buco alla Milanese',
    description: 'Braised veal shanks in white wine and broth, served with gremolata.',
    image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a',
    category: 'italian',
    prepTime: '180 mins',
    servings: 6,
    rating: 4.9,
    difficulty: 'Hard',
    author: {
      name: 'Mario Conti',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
  },
  {
    id: '20',
    title: 'Homemade Lasagna',
    description: 'Classic Italian lasagna with rich meat sauce and creamy béchamel.',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
    category: 'italian',
    prepTime: '120 mins',
    servings: 8,
    rating: 4.8,
    difficulty: 'Medium',
    author: {
      name: 'Laura Bianchi',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
  },

  // Asian Recipes
  {
    id: '4',
    title: 'Spicy Thai Green Curry',
    description: 'Authentic Thai green curry with coconut milk, vegetables, and your choice of protein.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'asian',
    prepTime: '45 mins',
    servings: 6,
    rating: 4.7,
    difficulty: 'Medium',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  },
  {
    id: '5',
    title: 'Japanese Ramen Bowl',
    description: 'Rich and flavorful ramen with chashu pork, soft-boiled egg, and fresh noodles.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    category: 'asian',
    prepTime: '60 mins',
    servings: 2,
    rating: 4.9,
    difficulty: 'Hard',
    author: {
      name: 'Kenji Tanaka',
      avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    },
  },
  {
    id: '6',
    title: 'Korean Bibimbap',
    description: 'Colorful rice bowl with vegetables, meat, and gochujang sauce.',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7',
    category: 'asian',
    prepTime: '35 mins',
    servings: 2,
    rating: 4.8,
    difficulty: 'Medium',
    author: {
      name: 'Min-ji Kim',
      avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    },
  },
  {
    id: '21',
    title: 'Dim Sum Platter',
    description: 'Assorted Chinese dumplings including shumai, har gow, and char siu bao.',
    image: 'https://images.unsplash.com/photo-1576087503901-b2e46e726761',
    category: 'asian',
    prepTime: '90 mins',
    servings: 4,
    rating: 4.8,
    difficulty: 'Hard',
    author: {
      name: 'David Wong',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
    },
  },
  {
    id: '22',
    title: 'Vietnamese Pho',
    description: 'Traditional beef noodle soup with herbs and rice noodles.',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43',
    category: 'asian',
    prepTime: '180 mins',
    servings: 6,
    rating: 4.9,
    difficulty: 'Medium',
    author: {
      name: 'Linh Nguyen',
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    },
  },

  // Mexican Recipes
  {
    id: '7',
    title: 'Authentic Street Tacos',
    description: 'Traditional Mexican street tacos with carne asada, onions, and cilantro.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    category: 'mexican',
    prepTime: '30 mins',
    servings: 4,
    rating: 4.8,
    difficulty: 'Easy',
    author: {
      name: 'Carlos Mendez',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    },
  },
  {
    id: '8',
    title: 'Chicken Enchiladas Verdes',
    description: 'Corn tortillas filled with shredded chicken and topped with green salsa.',
    image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615',
    category: 'mexican',
    prepTime: '50 mins',
    servings: 6,
    rating: 4.7,
    difficulty: 'Medium',
    author: {
      name: 'Ana Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
    },
  },
  {
    id: '23',
    title: 'Chiles en Nogada',
    description: 'Poblano chiles filled with picadillo, topped with walnut sauce and pomegranate seeds.',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f',
    category: 'mexican',
    prepTime: '120 mins',
    servings: 6,
    rating: 4.9,
    difficulty: 'Hard',
    author: {
      name: 'Ricardo Flores',
      avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
    },
  },
  {
    id: '24',
    title: 'Mole Poblano',
    description: 'Traditional Mexican sauce made with chocolate and chilies, served with chicken.',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f',
    category: 'mexican',
    prepTime: '180 mins',
    servings: 8,
    rating: 4.8,
    difficulty: 'Hard',
    author: {
      name: 'Maria Sanchez',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
  },

  // Desserts
  {
    id: '9',
    title: 'Homemade Chocolate Lava Cake',
    description: 'Decadent chocolate dessert with a gooey center. Perfect for chocolate lovers!',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'desserts',
    prepTime: '25 mins',
    servings: 2,
    rating: 4.9,
    difficulty: 'Medium',
    author: {
      name: 'Emily Baker',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  },
  {
    id: '10',
    title: 'Classic Tiramisu',
    description: 'Italian coffee-flavored dessert with layers of mascarpone and ladyfingers.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    category: 'desserts',
    prepTime: '40 mins',
    servings: 8,
    rating: 4.8,
    difficulty: 'Hard',
    author: {
      name: 'Sofia Conti',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
  },
  {
    id: '11',
    title: 'French Macarons',
    description: 'Delicate almond meringue cookies with various flavored fillings.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43',
    category: 'desserts',
    prepTime: '90 mins',
    servings: 24,
    rating: 4.6,
    difficulty: 'Hard',
    author: {
      name: 'Marie Laurent',
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
    },
  },
  {
    id: '25',
    title: 'Crème Brûlée',
    description: 'Classic French dessert with rich vanilla custard and caramelized sugar top.',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc',
    category: 'desserts',
    prepTime: '60 mins',
    servings: 4,
    rating: 4.8,
    difficulty: 'Medium',
    author: {
      name: 'Pierre Dubois',
      avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    },
  },
  {
    id: '26',
    title: 'Apple Pie',
    description: 'Classic American dessert with spiced apples in a flaky butter crust.',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a9',
    category: 'desserts',
    prepTime: '90 mins',
    servings: 8,
    rating: 4.7,
    difficulty: 'Medium',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
    },
  },

  // Vegetarian Recipes
  {
    id: '12',
    title: 'Mediterranean Quinoa Bowl',
    description: 'Healthy vegetarian bowl with quinoa, roasted vegetables, and tahini dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'vegetarian',
    prepTime: '35 mins',
    servings: 3,
    rating: 4.6,
    difficulty: 'Easy',
    author: {
      name: 'Alex Green',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  },
  {
    id: '13',
    title: 'Spinach and Ricotta Stuffed Shells',
    description: 'Jumbo pasta shells filled with spinach and ricotta cheese.',
    image: 'https://images.unsplash.com/photo-1533162507191-d90c625b2640',
    category: 'vegetarian',
    prepTime: '45 mins',
    servings: 6,
    rating: 4.7,
    difficulty: 'Medium',
    author: {
      name: 'Lisa Morgan',
      avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    },
  },
  {
    id: '27',
    title: 'Mushroom Wellington',
    description: 'Vegetarian version of beef wellington with portobello mushrooms and spinach.',
    image: 'https://images.unsplash.com/photo-1662487801217-b0653b1d8c4e',
    category: 'vegetarian',
    prepTime: '90 mins',
    servings: 6,
    rating: 4.8,
    difficulty: 'Hard',
    author: {
      name: 'James Green',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    },
  },
  {
    id: '28',
    title: 'Buddha Bowl',
    description: 'Nutritious bowl with brown rice, roasted chickpeas, and colorful vegetables.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: 'vegetarian',
    prepTime: '30 mins',
    servings: 2,
    rating: 4.7,
    difficulty: 'Easy',
    author: {
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
  },

  // Seafood Recipes
  {
    id: '14',
    title: 'Classic Fish Tacos',
    description: 'Baja-style fish tacos with crispy cod, slaw, and chipotle mayo.',
    image: 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'seafood',
    prepTime: '40 mins',
    servings: 4,
    rating: 4.7,
    difficulty: 'Medium',
    author: {
      name: 'Maria Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
  },
  {
    id: '15',
    title: 'Grilled Salmon with Lemon Butter',
    description: 'Fresh salmon fillet grilled to perfection with herbs and lemon butter sauce.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    category: 'seafood',
    prepTime: '25 mins',
    servings: 2,
    rating: 4.9,
    difficulty: 'Easy',
    author: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
  },
  {
    id: '29',
    title: 'Seafood Paella',
    description: 'Spanish rice dish with mixed seafood, saffron, and vegetables.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a',
    category: 'seafood',
    prepTime: '60 mins',
    servings: 6,
    rating: 4.8,
    difficulty: 'Hard',
    author: {
      name: 'Antonio Garcia',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
  },
  {
    id: '30',
    title: 'Shrimp Scampi',
    description: 'Garlic butter shrimp with white wine sauce over linguine.',
    image: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9',
    category: 'seafood',
    prepTime: '30 mins',
    servings: 4,
    rating: 4.7,
    difficulty: 'Medium',
    author: {
      name: 'Julia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    },
  },

  // Breakfast Recipes
  {
    id: '16',
    title: 'Fluffy Pancake Stack',
    description: 'Light and fluffy pancakes served with maple syrup and fresh berries.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'breakfast',
    prepTime: '20 mins',
    servings: 4,
    rating: 4.5,
    difficulty: 'Easy',
    author: {
      name: 'John Baker',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
  },
  {
    id: '17',
    title: 'Avocado Toast with Poached Eggs',
    description: 'Sourdough toast topped with mashed avocado, poached eggs, and chili flakes.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
    category: 'breakfast',
    prepTime: '15 mins',
    servings: 2,
    rating: 4.8,
    difficulty: 'Medium',
    author: {
      name: 'Emma Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    },
  },
  {
    id: '18',
    title: 'Acai Bowl with Fresh Fruits',
    description: 'Refreshing acai smoothie bowl topped with granola, fruits, and honey.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    category: 'breakfast',
    prepTime: '10 mins',
    servings: 1,
    rating: 4.7,
    difficulty: 'Easy',
    author: {
      name: 'Sophie Williams',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
  },
  {
    id: '31',
    title: 'Eggs Benedict',
    description: 'Classic brunch dish with poached eggs, Canadian bacon, and hollandaise sauce.',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7',
    category: 'breakfast',
    prepTime: '30 mins',
    servings: 2,
    rating: 4.9,
    difficulty: 'Hard',
    author: {
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    },
  },
  {
    id: '32',
    title: 'French Toast',
    description: 'Brioche bread dipped in vanilla custard, grilled, and topped with berries.',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
    category: 'breakfast',
    prepTime: '20 mins',
    servings: 4,
    rating: 4.6,
    difficulty: 'Easy',
    author: {
      name: 'Rachel Adams',
      avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
    },
  },
];

const RecipesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({
    time: 'Any',
    difficulty: 'Any',
    servings: 'Any',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = useMemo(() => {
    let results = [...dummyRecipes];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        recipe =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      results = results.filter(recipe => recipe.category === selectedCategory);
    }

    // Apply time filter
    if (filters.time !== 'Any') {
      results = results.filter(recipe => {
        const prepTimeMinutes = parseInt(recipe.prepTime);
        if (filters.time === '< 15 mins') return prepTimeMinutes < 15;
        if (filters.time === '15-30 mins') return prepTimeMinutes >= 15 && prepTimeMinutes <= 30;
        if (filters.time === '30-60 mins') return prepTimeMinutes >= 30 && prepTimeMinutes <= 60;
        if (filters.time === '> 60 mins') return prepTimeMinutes > 60;
        return true;
      });
    }

    // Apply difficulty filter
    if (filters.difficulty !== 'Any') {
      results = results.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    // Apply servings filter
    if (filters.servings !== 'Any') {
      const [min, max] = filters.servings.split('-').map(n => parseInt(n));
      results = results.filter(recipe => {
        if (max) {
          return recipe.servings >= min && recipe.servings <= max;
        }
        // For "7+" case
        return recipe.servings >= min;
      });
    }

    return results;
  }, [selectedCategory, filters, searchQuery]);

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Discover Recipes</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our collection of delicious recipes from around the world.
            Find your next favorite dish!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar
            onSearch={setSearchQuery}
            suggestions={RECIPE_SEARCH_SUGGESTIONS}
            placeholder="Search recipes..."
            storageKey={STORAGE_KEYS.RECIPE_SEARCH_HISTORY}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar with filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-4 space-y-4">
              <CategoryFilter
                categories={[]}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <FilterOptions
                filters={filters}
                onFilterChange={(filterType, value) =>
                  setFilters(prev => ({ ...prev, [filterType]: value }))
                }
              />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="mb-4 text-text-secondary">
              Found {filteredRecipes.length} recipes
            </div>
            <RecipeGrid recipes={filteredRecipes} />

            {/* No Results Message */}
            {filteredRecipes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-text-secondary text-lg">
                  No recipes found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RecipesPage; 