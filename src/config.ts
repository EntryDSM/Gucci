import { config } from 'dotenv';
config();

export const PORT = Number(process.env.PORT) || 8080;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb-uri';
export const MONGODB_NAME = 'gucci';
