import joi from 'joi';

// Define validation schema for environment variables
const envSchema = joi.object({
    // Server configuration
    NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
    PORT: joi.number().default(5001),
    APP_HOSTNAME: joi.string().required(),

    // Database configuration
    MONGODB_URI: joi.string().required(),

    // JWT configuration
    JWT_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    JWT_SECRET_EXPIRE_TIME: joi.string().required(),
    JWT_REFRESH_SECRET_EXPIRE_TIME: joi.string().required(),

    // Email configuration
    EMAIL_HOST: joi.string().required(),
    EMAIL_PORT: joi.number().required(),
    EMAIL_USER: joi.string().required(),
    EMAIL_PASS: joi.string().required(),

    // Google OAuth configuration
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
    GOOGLE_CALLBACK_URL: joi.string().uri().required(),

    // Password configuration
    PASSWORD_MIN_LENGTH: joi.number().default(8),
    SALT_JWT: joi.number().default(10),
}).unknown();

// Validate environment variables
const validateConfig = (config) => {
    const { error, value } = envSchema.validate(config);
    
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    return value;
};

export default validateConfig; 