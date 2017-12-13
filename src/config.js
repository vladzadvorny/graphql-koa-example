import dotenv from 'dotenv';
import path from 'path';

const root = path.join.bind(this, __dirname, '../');
dotenv.config({ path: root('.env') });

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = !isDevelopment;

// Database Settings
const dBdevelopment = process.env.MONGO_URL || 'mongodb://localhost/database';
const dBproduction = process.env.MONGO_URL || 'mongodb://localhost/database';

export const databaseConfig = isProduction ? dBproduction : dBdevelopment;

// Export Server settings
export const port = process.env.PORT || 3000;
export const endpointURL = process.env.ENDPOINT_URL || '/graphql';
export const jwtSecret = process.env.JWT_KEY || 'awesome_secret_key';
