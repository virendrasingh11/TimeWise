require('dotenv').config();

// Environment variables & secrets management
const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    llmApiKey: process.env.LLM_API_KEY,
    databaseUrl: process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV || 'development'
};

// Validate critical secrets management
if (!config.jwtSecret || !config.mongoUri) {
    console.warn("WARNING: Critical environment variables are missing. Please check your .env file.");
}

module.exports = config;
