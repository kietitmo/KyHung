import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import 'module-alias/register.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

// Database
import connectDB from './data-access/db/db.js';

// Routes
import authRoutes from './entry-points/routes/auth.routes.js';
import userRoutes from './entry-points/routes/user.routes.js';
import productRoutes from './entry-points/routes/product.routes.js';
import categoryRoutes from './entry-points/routes/category.routes.js';
import favoriteProductRoutes from './entry-points/routes/favoriteProduct.routes.js';
import fileRoutes from './entry-points/routes/file.routes.js';

// Middleware
import errorHandler from './entry-points/middlewares/error.middleware.js';
import {
	apiLimiter,
	authLimiter,
} from './entry-points/middlewares/rateLimiter.middleware.js';
import applySecurityMiddleware from './entry-points/middlewares/security.middleware.js';
import logger from './entry-points/middlewares/logger.middleware.js';

// Configuration
import './config/passportConfig.js';
import env from './config/env.js';

class App {
	constructor() {
		this.app = express();
		this.port = env.PORT || 5000;

		this.initializeDatabase();
		this.initializeMiddleware();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	// Initialize database connection
	initializeDatabase() {
		connectDB(env.MONGODB_URI);
	}

	// Initialize middleware
	initializeMiddleware() {
		// Apply security middleware
		applySecurityMiddleware(this.app);

		// Apply logger
		logger(this.app);

		// Parse JSON bodies
		this.app.use(express.json({ limit: env.REQUEST_BODY_LIMIT }));

		// Parse URL-encoded bodies
		this.app.use(
			express.urlencoded({ extended: true, limit: env.REQUEST_BODY_LIMIT })
		);

		// Parse cookies
		this.app.use(cookieParser());

		// Initialize passport
		this.app.use(passport.initialize());

		// Apply rate limiting
		this.app.use('/api/auth/login', authLimiter);
		this.app.use('/api/auth/register', authLimiter);
		this.app.use('/api', apiLimiter);
	}

	// Initialize routes
	initializeRoutes() {
		// Health check endpoint
		this.app.get('/health', (req, res) => {
			res.status(200).json({
				status: 'ok',
				timestamp: new Date().toISOString(),
				environment: env.NODE_ENV,
			});
		});

		// Swagger UI
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

		// API routes
		this.app.use('/api/auth', authRoutes);
		this.app.use('/api/users', userRoutes);
		this.app.use('/api/products', productRoutes);
		this.app.use('/api/categories', categoryRoutes);
		this.app.use('/api/favoriteProduct', favoriteProductRoutes);
		this.app.use('/api/files', fileRoutes);

		// Handle 404 routes
		this.app.use('*', (req, res) => {
			res.status(404).json({
				status: 'fail',
				message: `Can't find ${req.originalUrl} on this server!`,
			});
		});
	}

	// Initialize error handling
	initializeErrorHandling() {
		this.app.use(errorHandler);
	}

	// Start the server
	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running in ${env.NODE_ENV} mode on port ${this.port}`);
		});
	}
}

// Create and start the application
const app = new App();
app.listen();
