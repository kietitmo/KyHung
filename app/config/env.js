import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import joi from 'joi';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine the environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Load the appropriate environment file
let envFile;
switch (NODE_ENV) {
  case 'development':
    envFile = '.env.development';
    break;
  case 'test':
    envFile = '.env.test';
    break;
  case 'production':
    envFile = '.env.production';
    break;
  default:
    envFile = '.env.development';
}

// Load environment variables from the appropriate file
const result = dotenv.config({ path: path.resolve(process.cwd(), envFile) });

if (result.error) {
  console.warn(`Warning: ${envFile} file not found. Using default environment variables.`);
}

// Define validation schema for environment variables
const envSchema = joi.object({
  // Application Configuration
  NODE_ENV: joi.string().valid('development', 'test', 'production').default('development'),
  APP_HOSTNAME: joi.string().required(),
  PORT: joi.number().default(5000),
  MONGODB_URI: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_SECRET_EXPIRE_TIME: joi.string().required(),
  JWT_REFRESH_SECRET: joi.string().required(),
  JWT_REFRESH_SECRET_EXPIRE_TIME: joi.string().required(),
  SALT_JWT: joi.number().default(10),
  
  // Rate Limiter Configuration
  RATE_LIMIT_WINDOW_MS: joi.number().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: joi.number().default(100),
  AUTH_RATE_LIMIT_WINDOW_MS: joi.number().default(60 * 60 * 1000), // 1 hour
  AUTH_RATE_LIMIT_MAX_REQUESTS: joi.number().default(5),
  
  // Request Body Limits
  REQUEST_BODY_LIMIT: joi.string().default('10kb'),
  
  // Database Configuration
  DB_CONNECTION_TIMEOUT_MS: joi.number().default(5000),
  DB_RETRY_DELAY_MS: joi.number().default(5000),
  
  // Cookie Configuration
  REFRESH_TOKEN_MAX_AGE_MS: joi.number().default(7 * 24 * 60 * 60 * 1000), // 7 days
  
  // Pagination Defaults
  DEFAULT_PAGE_SIZE: joi.number().default(10),
  
  // Validation Regular Expressions
  URL_REGEXP: joi.any().required(),
  EMAIL_REGEXP: joi.any().required(),
  FULL_NAME_REGEXP: joi.any().required(),
  PASSWORD_REGEXP: joi.any().required(),
  PASSWORD_MIN_LENGTH: joi.number().default(8),
  
  // Google OAuth Configuration
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  GOOGLE_CALLBACK_URL: joi.string().required(),
  
  // Email Configuration
  MAIL_SERVICE: joi.string().required(),
  MAIL_USER: joi.string().required(),
  MAIL_PASSWORD: joi.string().required(),
  
  // Gmail OAuth Configuration
  GMAIL_USERNAME: joi.string().required(),
  OAUTH_CLIENT_ID: joi.string().required(),
  OAUTH_CLIENT_SECRET: joi.string().required(),
  OAUTH_REFRESH_TOKEN: joi.string().required(),
  OAUTH_ACCESS_TOKEN: joi.string().required(),
  
  // Node Environment
  EMAIL_HOST: joi.string().required(),
  EMAIL_PORT: joi.number().default(587),
  EMAIL_USER: joi.string().required(),
  EMAIL_PASS: joi.string().required(),
  
  // Environment-specific Settings
  LOG_LEVEL: joi.string().valid('debug', 'info', 'warn', 'error').default('info'),
  CORS_ORIGIN: joi.string().required(),
}).unknown();

// Validate environment variables
const validateEnv = (env) => {
  const { error, value } = envSchema.validate(env);
  
  if (error) {
    console.error(`Environment validation error: ${error.message}`);
    // In production, we might want to exit the process
    if (NODE_ENV === 'production') {
      process.exit(1);
    }
  }
  
  return value;
};

// Create the environment object
const envObj = {
  NODE_ENV,
  APP_HOSTNAME: process.env.APP_HOSTNAME,
  PORT: parseInt(process.env.PORT, 10) || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_EXPIRE_TIME: process.env.JWT_SECRET_EXPIRE_TIME,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_SECRET_EXPIRE_TIME: process.env.JWT_REFRESH_SECRET_EXPIRE_TIME,
  SALT_JWT: parseInt(process.env.SALT_JWT, 10) || 10,
  
  // Rate Limiter Configuration
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  AUTH_RATE_LIMIT_WINDOW_MS: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 10) || 60 * 60 * 1000,
  AUTH_RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS, 10) || 5,
  
  // Request Body Limits
  REQUEST_BODY_LIMIT: process.env.REQUEST_BODY_LIMIT || '10kb',
  
  // Database Configuration
  DB_CONNECTION_TIMEOUT_MS: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS, 10) || 5000,
  DB_RETRY_DELAY_MS: parseInt(process.env.DB_RETRY_DELAY_MS, 10) || 5000,
  
  // Cookie Configuration
  REFRESH_TOKEN_MAX_AGE_MS: parseInt(process.env.REFRESH_TOKEN_MAX_AGE_MS, 10) || 7 * 24 * 60 * 60 * 1000,
  
  // Pagination Defaults
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE, 10) || 10,
  
  // Regular expressions
  URL_REGEXP: new RegExp(process.env.URL_REGEXP || '^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$'),
  EMAIL_REGEXP: new RegExp(process.env.EMAIL_REGEXP || '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$'),
  FULL_NAME_REGEXP: new RegExp(process.env.FULL_NAME_REGEXP || '^[A-Za-z\s]{1,50}$'),
  PASSWORD_REGEXP: new RegExp(process.env.PASSWORD_REGEXP || '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'),
  PASSWORD_MIN_LENGTH: parseInt(process.env.PASSWORD_MIN_LENGTH, 10) || 8,
  
  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  
  // Email
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  
  // Gmail OAuth
  GMAIL_USERNAME: process.env.GMAIL_USERNAME,
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
  OAUTH_ACCESS_TOKEN: process.env.OAUTH_ACCESS_TOKEN,
  
  // Email configuration
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT, 10) || 587,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  
  // Environment-specific settings
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

// Validate and export the environment variables
export const env = validateEnv(envObj);

export default env; 