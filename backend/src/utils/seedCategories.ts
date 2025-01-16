import { AppDataSource } from "../config/database";
import { Category } from "../models/Category";

const categoryData = [
    {
        name: "asian",
        description: "Discover authentic Asian recipes, from stir-fries to sushi",
        image_url: "/images/categories/asian.jpg"
    },
    {
        name: "breakfast",
        description: "Start your day with delicious breakfast recipes",
        image_url: "/images/categories/breakfast.jpg"
    },
    {
        name: "desserts",
        description: "Sweet treats and delightful desserts for every occasion",
        image_url: "/images/categories/desserts.jpg"
    },
    {
        name: "italian",
        description: "Classic Italian recipes from pasta to pizza",
        image_url: "/images/categories/italian.jpg"
    },
    {
        name: "mexican",
        description: "Spicy and flavorful Mexican cuisine",
        image_url: "/images/categories/mexican.jpg"
    },
    {
        name: "seafood",
        description: "Fresh seafood recipes from around the world",
        image_url: "/images/categories/seafood.jpg"
    },
    {
        name: "vegetarian",
        description: "Healthy and delicious vegetarian dishes",
        image_url: "/images/categories/vegetarian.jpg"
    }
];

export async function seedCategories() {
    const categoryRepository = AppDataSource.getRepository(Category);
    
    try {
        // Check if categories already exist
        const existingCategories = await categoryRepository.find();
        
        if (existingCategories.length === 0) {
            console.log('Seeding categories...');
            
            // Create categories
            for (const category of categoryData) {
                const newCategory = categoryRepository.create(category);
                await categoryRepository.save(newCategory);
                console.log(`Created category: ${category.name}`);
            }
            
            console.log('Categories seeded successfully!');
        } else {
            console.log('Categories already exist, skipping seed.');
        }
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
} 