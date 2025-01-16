import { AppDataSource } from '../config/database';
import { Recipe } from '../models/Recipe';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { DifficultyLevel } from '../models/Recipe';
import { UserType } from '../models/User';

export const seedRecipes = async () => {
    const recipeRepository = AppDataSource.getRepository(Recipe);
    const categoryRepository = AppDataSource.getRepository(Category);
    const userRepository = AppDataSource.getRepository(User);

    // Check if recipes already exist
    const existingRecipes = await recipeRepository.count();
    if (existingRecipes > 0) {
        console.log('Recipes already seeded');
        return;
    }

    // Get categories and create a map for easy lookup
    const categories = await categoryRepository.find();
    const categoryMap = new Map(categories.map(cat => [cat.name.toLowerCase(), cat.id]));

    // Get or create a default admin user for recipes
    let adminUser = await userRepository.findOne({ where: { user_type: UserType.ADMIN } });
    if (!adminUser) {
        adminUser = userRepository.create({
            username: 'admin',
            email: 'admin@example.com',
            password_hash: 'admin123', // This should be properly hashed in production
            user_type: UserType.ADMIN
        });
        await userRepository.save(adminUser);
    }

    // Dummy recipes data
    const recipesData = [
        {
            title: 'Classic Italian Pasta Carbonara',
            description: 'Creamy pasta dish with pancetta, eggs, and Pecorino Romano cheese. A true Roman classic!',
            image_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
            category_name: 'italian',
            prep_time: '30 mins',
            servings: 4,
            rating: 4.8,
            difficulty_level: DifficultyLevel.MEDIUM
        },
        {
            title: 'Spicy Thai Green Curry',
            description: 'Authentic Thai green curry with coconut milk, vegetables, and your choice of protein.',
            image_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
            category_name: 'asian',
            prep_time: '45 mins',
            servings: 6,
            rating: 4.7,
            difficulty_level: DifficultyLevel.MEDIUM
        },
        {
            title: 'Authentic Street Tacos',
            description: 'Traditional Mexican street tacos with carne asada, onions, and cilantro.',
            image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
            category_name: 'mexican',
            prep_time: '30 mins',
            servings: 4,
            rating: 4.8,
            difficulty_level: DifficultyLevel.EASY
        },
        {
            title: 'Homemade Chocolate Lava Cake',
            description: 'Decadent chocolate dessert with a gooey center. Perfect for chocolate lovers!',
            image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51',
            category_name: 'desserts',
            prep_time: '25 mins',
            servings: 2,
            rating: 4.9,
            difficulty_level: DifficultyLevel.MEDIUM
        },
        {
            title: 'Mediterranean Quinoa Bowl',
            description: 'Healthy vegetarian bowl with quinoa, roasted vegetables, and tahini dressing.',
            image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
            category_name: 'vegetarian',
            prep_time: '35 mins',
            servings: 3,
            rating: 4.6,
            difficulty_level: DifficultyLevel.EASY
        },
        {
            title: 'Classic Fish Tacos',
            description: 'Baja-style fish tacos with crispy cod, slaw, and chipotle mayo.',
            image_url: 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd',
            category_name: 'seafood',
            prep_time: '40 mins',
            servings: 4,
            rating: 4.7,
            difficulty_level: DifficultyLevel.MEDIUM
        },
        {
            title: 'Fluffy Pancake Stack',
            description: 'Light and fluffy pancakes served with maple syrup and fresh berries.',
            image_url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
            category_name: 'breakfast',
            prep_time: '20 mins',
            servings: 4,
            rating: 4.5,
            difficulty_level: DifficultyLevel.EASY
        }
    ];

    // Create recipes
    for (const recipeData of recipesData) {
        const { category_name, ...recipeFields } = recipeData;
        const categoryId = categoryMap.get(category_name);
        
        if (!categoryId) {
            console.warn(`Category "${category_name}" not found, skipping recipe "${recipeData.title}"`);
            continue;
        }

        const recipe = recipeRepository.create({
            ...recipeFields,
            category_id: categoryId,
            author_id: adminUser.id
        });

        await recipeRepository.save(recipe);
    }

    console.log('Recipes seeded successfully');
}; 