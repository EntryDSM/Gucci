import { config } from 'dotenv';
config();

export const port = Number(process.env.PORT) || 8080;
export const mongodbUri = process.env.MONGODB_URI || 'mongodb-uri';
export const mongodbName = 'gucci';
