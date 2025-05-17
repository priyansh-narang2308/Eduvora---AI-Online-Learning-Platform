import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
config(); 

export default defineConfig({
    schema: './config/schema.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
