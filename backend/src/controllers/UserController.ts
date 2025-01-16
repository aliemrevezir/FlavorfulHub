import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import * as bcrypt from 'bcrypt';

export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    async getAllUsers(_req: Request, res: Response) {
        try {
            const users = await this.userRepository.find({
                select: ['id', 'username', 'email', 'profile_image', 'created_at']
            });
            return res.json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Error fetching users' });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;

            const existingUser = await this.userRepository.findOne({
                where: [{ username }, { email }]
            });

            if (existingUser) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = this.userRepository.create({
                username,
                email,
                password_hash: hashedPassword
            });

            const savedUser = await this.userRepository.save(user);
            const { password_hash: _, ...userWithoutPassword } = savedUser;
            
            return res.status(201).json(userWithoutPassword);
        } catch (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Error creating user' });
        }
    }
} 