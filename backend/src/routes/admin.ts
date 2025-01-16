import { Router, Request, Response } from 'express';
import { AdminController } from '../controllers/AdminController';
import { adminAuth } from '../middleware/adminAuth';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

const router = Router();
const adminController = new AdminController();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        const uploadDir = 'public/image';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Image upload endpoint
router.post('/upload', adminAuth, upload.single('image'), (req: MulterRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Return the URL for the uploaded image
        const imageUrl = `/image/${req.file.filename}`;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
});

// Dashboard overview
router.get('/dashboard', adminAuth, adminController.getDashboardStats);

// User management
router.get('/users', adminAuth, adminController.getAllUsers);
router.put('/users/:id', adminAuth, adminController.updateUser);
router.delete('/users/:id', adminAuth, adminController.deleteUser);

// Recipe management
router.get('/recipes', adminAuth, adminController.getAllRecipes);
router.get('/recipes/:id', adminAuth, adminController.getRecipe);
router.post('/recipes/upload', adminAuth, upload.single('image'), (req: MulterRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Return the URL for the uploaded image
        const imageUrl = `/image/${req.file.filename}`;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
});
router.post('/recipes', adminAuth, adminController.createRecipe);
router.put('/recipes/:id', adminAuth, adminController.updateRecipe);
router.delete('/recipes/:id', adminAuth, adminController.deleteRecipe);

// Category management
router.get('/categories', adminAuth, adminController.getAllCategories);
router.get('/categories/:id', adminAuth, adminController.getCategory);
router.post('/categories', adminAuth, adminController.createCategory);
router.put('/categories/:id', adminAuth, adminController.updateCategory);
router.delete('/categories/:id', adminAuth, adminController.deleteCategory);

export default router; 