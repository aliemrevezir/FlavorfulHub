import "reflect-metadata";
import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import { initializeDatabase } from "./config/database";
import userRoutes from './routes/users';
import { environment } from "./config/environment";
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/image', express.static(path.join(__dirname, '../public/image')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'FlavorfulHub API is running' });
});

const startServer = async () => {
    try {
        // Initialize database
        await initializeDatabase();

        // Start server
        app.listen(environment.port, () => {
            console.log(`Server is running on port ${environment.port}`);
            console.log(`Health check available at: http://localhost:${environment.port}/api/health`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app; 