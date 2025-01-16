import * as dotenv from 'dotenv';
import path from 'path';

// Initialize dotenv with the correct path to .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Validate required environment variables
const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

console.log('Environment variables loaded successfully'); 