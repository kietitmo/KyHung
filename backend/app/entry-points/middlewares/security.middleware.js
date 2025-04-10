import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import env from '../../config/env.js';

/**
 * Apply security middleware to the Express application
 * @param {Express.Application} app - Express application
 */
const applySecurityMiddleware = (app) => {
	// Set security HTTP headers
	app.use(helmet());

	// Data sanitization against NoSQL query injection
	app.use(mongoSanitize());

	// Data sanitization against XSS
	app.use(xss());

	// Prevent parameter pollution
	app.use(hpp());

	// Enable CORS
	const corsOptions = {
		origin: env.NODE_ENV === 'production' ? [env.CORS_ORIGIN] : true,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	};
	app.use(cors(corsOptions));

	// Trust proxy if behind a reverse proxy
	if (env.NODE_ENV === 'production') {
		app.set('trust proxy', 1);
	}
};

export default applySecurityMiddleware;
