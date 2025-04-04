import dotenv from 'dotenv';
import validateConfig from './configValidator.js';

// Load environment variables
dotenv.config();

// Regular expressions for validation
const REGEXP = {
	EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
	FULL_NAME: /^[a-zA-Z\s]{2,30}$/,
	PHONE: /^\+?[1-9]\d{1,14}$/,
};

// Validate environment variables
const validatedConfig = validateConfig(process.env);

const Config = {
	// Server configuration
	NODE_ENV: validatedConfig.NODE_ENV,
	PORT: validatedConfig.PORT,
	APP_HOSTNAME: validatedConfig.APP_HOSTNAME,

	// Database configuration
	MONGODB_URI: validatedConfig.MONGODB_URI,

	// JWT configuration
	JWT_SECRET: validatedConfig.JWT_SECRET,
	JWT_REFRESH_SECRET: validatedConfig.JWT_REFRESH_SECRET,
	JWT_SECRET_EXPIRE_TIME: validatedConfig.JWT_SECRET_EXPIRE_TIME,
	JWT_REFRESH_SECRET_EXPIRE_TIME: validatedConfig.JWT_REFRESH_SECRET_EXPIRE_TIME,

	// Email configuration
	EMAIL_HOST: validatedConfig.EMAIL_HOST,
	EMAIL_PORT: validatedConfig.EMAIL_PORT,
	EMAIL_USER: validatedConfig.EMAIL_USER,
	EMAIL_PASS: validatedConfig.EMAIL_PASS,

	// Google OAuth configuration
	GOOGLE_CLIENT_ID: validatedConfig.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: validatedConfig.GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL: validatedConfig.GOOGLE_CALLBACK_URL,

	// Password configuration
	PASSWORD_MIN_LENGTH: validatedConfig.PASSWORD_MIN_LENGTH,
	SALT_JWT: validatedConfig.SALT_JWT,

	// Regular expressions
	EMAIL_REGEXP: REGEXP.EMAIL,
	PASSWORD_REGEXP: REGEXP.PASSWORD,
	FULL_NAME_REGEXP: REGEXP.FULL_NAME,
	PHONE_REGEXP: REGEXP.PHONE,

	// Cookie configuration
	COOKIE_OPTIONS: {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'Strict',
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	},
};

export default Config;
