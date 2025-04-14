import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import 'module-alias/register.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './common/config/swagger.js';

// Database
import connectDB from './common/db/db.js';

// Routes
import authRoutes from './auth/entry-points/routes/auth.routes.js';
import adminAuthRoutes from './auth/entry-points/routes/admin.routes.js';
import adminUserRoutes from './user/entry-points/routes/admin.routes.js';
import userRoutes from './user/entry-points/routes/user.routes.js';
import productRoutes from './product/entry-points/routes/product.routes.js';
import adminProductRoutes from './product/entry-points/routes/admin.routes.js';
import categoryRoutes from './category/entry-points/routes/category.routes.js';
import adminCategoryRoutes from './category/entry-points/routes/admin.routes.js';
import favoriteProductRoutes from './favorite/entry-points/routes/favoriteProduct.routes.js';
// import fileRoutes from './common/file-service/file.routes.js';

// Middleware
import errorHandler from './common/middlewares/error.middleware.js';
import {
	apiLimiter,
	authLimiter,
} from './common/middlewares/rateLimiter.middleware.js';
import applySecurityMiddleware from './common/middlewares/security.middleware.js';
import {
	logger,
	morganMiddleware,
} from './common/middlewares/logger.middleware.js';

// Configuration
import './common/config/passportConfig.js';
import env from './common/config/env.js';

class App {
	constructor() {
		this.app = express();
		this.port = env.PORT || 5001;
		this.server = null;
	}

	// Initialize database connection
	async initializeDatabase() {
		try {
			await connectDB(env.MONGODB_URI);
			logger.console('Database connected successfully');
		} catch (error) {
			logger.console('Database connection failed:', error);
			process.exit(1);
		}
	}

	// Initialize middleware
	initializeMiddleware() {
		// Apply security middleware
		applySecurityMiddleware(this.app);

		// Apply logger
		morganMiddleware(this.app);

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
		// this.app.use('/api/files', fileRoutes);

		this.app.use('/api/admin/users', adminUserRoutes);
		this.app.use('/api/admin/auth', adminAuthRoutes);
		this.app.use('/api/admin/products', adminProductRoutes);
		this.app.use('/api/admin/categories', adminCategoryRoutes);
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

	// Graceful shutdown
	async gracefulShutdown() {
		logger.console('Received shutdown signal. Starting graceful shutdown...');

		if (this.server) {
			this.server.close(() => {
				logger.console('HTTP server closed');
				process.exit(0);
			});
		}
	}

	// Start the server
	async start() {
		try {
			// Initialize all components
			await this.initializeDatabase();
			this.initializeMiddleware();
			this.initializeRoutes();
			this.initializeErrorHandling();

			// Start server
			this.server = this.app.listen(this.port, () => {
				logger.console(
					`Server running in ${env.NODE_ENV} mode on port ${this.port}`
				);
			});

			// Handle graceful shutdown
			process.on('SIGTERM', () => this.gracefulShutdown());
			process.on('SIGINT', () => this.gracefulShutdown());

			// Handle uncaught exceptions
			process.on('uncaughtException', (error) => {
				logger.console('Uncaught Exception:', error);
				this.gracefulShutdown();
			});

			// Handle unhandled promise rejections
			process.on('unhandledRejection', (reason, promise) => {
				logger.console('Unhandled Rejection at:', promise, 'reason:', reason);
				this.gracefulShutdown();
			});
		} catch (error) {
			logger.console('Failed to start server:', error);
			process.exit(1);
		}
	}
}

// Create and start the application
const app = new App();
app.start();
