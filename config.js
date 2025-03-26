require('dotenv').config(); // Load environment variables from .env file

const config = {
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/market', // MongoDB connection URI
    PORT: process.env.PORT || 3000, // Port for the application
    JWT_SECRET: process.env.JWT_SECRET || 'defaultSecretKey' // JWT secret key
};

module.exports = config;