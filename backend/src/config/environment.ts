import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const environment = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5000', 10),
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: parseInt(process.env.DB_PORT || '5432', 10),
    dbUser: process.env.DB_USER || 'postgres',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || 'flavorfulhub',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
};

// Log configuration (without sensitive data)
console.log('Environment configuration loaded:', {
  nodeEnv: environment.nodeEnv,
  port: environment.port,
  dbHost: environment.dbHost,
  dbPort: environment.dbPort,
  dbUser: environment.dbUser,
  dbName: environment.dbName
}); 