import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User, UserType } from '../models/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { environment } from '../config/environment';

export class AuthController {
    private userRepository = AppDataSource.getRepository(User);

    async register(req: Request, res: Response) {
        try {
            const { username, email, password, user_type } = req.body;

            // Validate input
            if (!username || !email || !password) {
                return res.status(400).json({
                    error: 'Username, email and password are required'
                });
            }

            // Check if user already exists
            const existingUser = await this.userRepository.findOne({
                where: [{ username }, { email }]
            });

            if (existingUser) {
                return res.status(400).json({
                    error: 'Username or email already exists'
                });
            }

            // For first user, allow admin registration
            // For subsequent users, force default_user type
            const userCount = await this.userRepository.count();
            const finalUserType = userCount === 0 ? UserType.ADMIN : UserType.DEFAULT_USER;

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = this.userRepository.create({
                username,
                email,
                password_hash: hashedPassword,
                user_type: finalUserType
            });

            // Save user
            const savedUser = await this.userRepository.save(user);

            // Generate JWT token
            const token = jwt.sign(
                { userId: savedUser.id },
                environment.jwtSecret,
                { expiresIn: '24h' }
            );

            // Return user data (excluding password) and token
            const { password_hash: _, ...userWithoutPassword } = savedUser;
            return res.status(201).json({
                user: userWithoutPassword,
                token
            });

        } catch (err) {
            console.error('Registration error:', err);
            return res.status(500).json({
                error: 'Error during registration'
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({
                    error: 'Email and password are required'
                });
            }

            // Find user
            const user = await this.userRepository.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(401).json({
                    error: 'Invalid credentials'
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password_hash);

            if (!isValidPassword) {
                return res.status(401).json({
                    error: 'Invalid credentials'
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id },
                environment.jwtSecret,
                { expiresIn: '24h' }
            );

            // Return user data (excluding password) and token
            const { password_hash: _, ...userWithoutPassword } = user;
            return res.json({
                user: userWithoutPassword,
                token
            });

        } catch (err) {
            console.error('Login error:', err);
            return res.status(500).json({
                error: 'Error during login'
            });
        }
    }
} 