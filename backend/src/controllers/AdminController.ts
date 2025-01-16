import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User, UserType } from '../models/User';
import { Recipe } from '../models/Recipe';
import { Category } from '../models/Category';

export class AdminController {
    private userRepository = AppDataSource.getRepository(User);
    private recipeRepository = AppDataSource.getRepository(Recipe);
    private categoryRepository = AppDataSource.getRepository(Category);

    // Dashboard
    getDashboardStats = async (req: Request, res: Response) => {
        try {
            const [totalUsers, totalRecipes, totalCategories] = await Promise.all([
                this.userRepository.count(),
                this.recipeRepository.count(),
                this.categoryRepository.count()
            ]);

            return res.json({
                stats: {
                    totalUsers,
                    totalRecipes,
                    totalCategories
                }
            });
        } catch (err) {
            console.error('Error fetching dashboard stats:', err);
            return res.status(500).json({ error: 'Error fetching dashboard statistics' });
        }
    };

    // User Management
    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userRepository.find({
                order: { created_at: 'DESC' }
            });
            return res.json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Error fetching users' });
        }
    };

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { user_type } = req.body;

            if (!Object.values(UserType).includes(user_type)) {
                return res.status(400).json({ error: 'Invalid user type' });
            }

            const user = await this.userRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.user_type === UserType.ADMIN && user_type !== UserType.ADMIN) {
                const adminCount = await this.userRepository.count({
                    where: { user_type: UserType.ADMIN }
                });

                if (adminCount <= 1) {
                    return res.status(400).json({ error: 'Cannot change the last admin user' });
                }
            }

            user.user_type = user_type;
            await this.userRepository.save(user);

            const { password_hash: _, ...userWithoutPassword } = user;
            return res.json(userWithoutPassword);
        } catch (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Error updating user' });
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await this.userRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.user_type === UserType.ADMIN) {
                const adminCount = await this.userRepository.count({
                    where: { user_type: UserType.ADMIN }
                });

                if (adminCount <= 1) {
                    return res.status(400).json({ error: 'Cannot delete the last admin user' });
                }
            }

            await this.userRepository.remove(user);
            return res.json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Error deleting user' });
        }
    };

    // Recipe Management
    getAllRecipes = async (req: Request, res: Response) => {
        try {
            const recipes = await this.recipeRepository.find({
                relations: ['category', 'author'],
                order: { created_at: 'DESC' }
            });
            return res.json(recipes);
        } catch (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).json({ error: 'Error fetching recipes' });
        }
    };

    // Get Single Recipe
    getRecipe = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const recipe = await this.recipeRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['category', 'author']
            });

            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            return res.json(recipe);
        } catch (err) {
            console.error('Error fetching recipe:', err);
            return res.status(500).json({ error: 'Error fetching recipe' });
        }
    };

    createRecipe = async (req: Request, res: Response) => {
        try {
            const { 
                title, 
                description, 
                category_id, 
                image_url, 
                prep_time, 
                servings, 
                difficulty_level 
            } = req.body;

            // Validate required fields
            if (!title || !description || !category_id) {
                return res.status(400).json({ error: 'Title, description, and category are required' });
            }

            // Validate category exists
            const category = await this.categoryRepository.findOne({
                where: { id: parseInt(category_id) }
            });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            // Get author from authenticated user
            const author_id = (req as any).user.id;

            // Create recipe with proper category relationship
            const recipe = this.recipeRepository.create({
                title,
                description,
                category_id: parseInt(category_id),
                category, // Add this to establish the relationship
                image_url,
                prep_time,
                servings: parseInt(servings),
                difficulty_level,
                author_id,
                rating: 0
            });

            await this.recipeRepository.save(recipe);

            // Fetch the complete recipe with relations
            const savedRecipe = await this.recipeRepository.findOne({
                where: { id: recipe.id },
                relations: ['category', 'author']
            });

            return res.status(201).json(savedRecipe);
        } catch (err) {
            console.error('Error creating recipe:', err);
            return res.status(500).json({ error: 'Error creating recipe' });
        }
    };

    updateRecipe = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { 
                title, 
                description, 
                category_id, 
                image_url, 
                prep_time, 
                servings, 
                difficulty_level 
            } = req.body;

            const recipe = await this.recipeRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['category'] // Add this to load the current category
            });

            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            // Validate and update category if provided
            if (category_id) {
                const category = await this.categoryRepository.findOne({
                    where: { id: parseInt(category_id) }
                });

                if (!category) {
                    return res.status(404).json({ error: 'Category not found' });
                }

                recipe.category = category; // Update the relationship
                recipe.category_id = category.id;
            }

            // Update recipe fields
            if (title) recipe.title = title;
            if (description) recipe.description = description;
            if (image_url) recipe.image_url = image_url;
            if (prep_time) recipe.prep_time = prep_time;
            if (servings) recipe.servings = parseInt(servings);
            if (difficulty_level) recipe.difficulty_level = difficulty_level;

            await this.recipeRepository.save(recipe);

            // Fetch the updated recipe with relations
            const updatedRecipe = await this.recipeRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['category', 'author']
            });

            return res.json(updatedRecipe);
        } catch (err) {
            console.error('Error updating recipe:', err);
            return res.status(500).json({ error: 'Error updating recipe' });
        }
    };

    deleteRecipe = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const recipe = await this.recipeRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            await this.recipeRepository.remove(recipe);
            return res.json({ message: 'Recipe deleted successfully' });
        } catch (err) {
            console.error('Error deleting recipe:', err);
            return res.status(500).json({ error: 'Error deleting recipe' });
        }
    };

    // Category Management
    getAllCategories = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryRepository.find({
                relations: ['recipes']
            });
            return res.json(categories);
        } catch (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ error: 'Error fetching categories' });
        }
    };

    // Get Single Category
    getCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await this.categoryRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['recipes']
            });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            return res.json(category);
        } catch (err) {
            console.error('Error fetching category:', err);
            return res.status(500).json({ error: 'Error fetching category' });
        }
    };

    createCategory = async (req: Request, res: Response) => {
        try {
            const { name, description, image_url } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Category name is required' });
            }

            // Check if category already exists
            const existingCategory = await this.categoryRepository.findOne({
                where: { name }
            });

            if (existingCategory) {
                return res.status(400).json({ error: 'Category already exists' });
            }

            const category = this.categoryRepository.create({
                name,
                description,
                image_url
            });

            await this.categoryRepository.save(category);
            return res.status(201).json(category);
        } catch (err) {
            console.error('Error creating category:', err);
            return res.status(500).json({ error: 'Error creating category' });
        }
    };

    updateCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const category = await this.categoryRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            if (name) category.name = name;
            if (description) category.description = description;

            await this.categoryRepository.save(category);
            return res.json(category);
        } catch (err) {
            console.error('Error updating category:', err);
            return res.status(500).json({ error: 'Error updating category' });
        }
    };

    deleteCategory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await this.categoryRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            await this.categoryRepository.remove(category);
            return res.json({ message: 'Category deleted successfully' });
        } catch (err) {
            console.error('Error deleting category:', err);
            return res.status(500).json({ error: 'Error deleting category' });
        }
    };
} 