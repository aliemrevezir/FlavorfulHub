import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User, UserType } from '../models/User';
import { environment } from '../config/environment';

export interface AuthRequest extends Request {
    user?: User;
}

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, environment.jwtSecret) as { userId: number };
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: decoded.userId }
        });

        if (!user || user.user_type !== UserType.ADMIN) {
            return res.status(403).json({ error: 'Admin access required' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}; 