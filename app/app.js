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

// Middleware
import errorHandler from './entry-points/middlewares/error.middleware.js';

// Configuration
import './config/passportConfig.js';
import Config from './config/config.js';

class App {
	constructor() {
		this.app = express();
		this.port = Config.PORT || 5000;

		this.initializeDatabase();
		this.initializeMiddleware();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	// Initialize database connection
	initializeDatabase() {
		connectDB();
	}

	// Initialize middleware
	initializeMiddleware() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(cookieParser());
		this.app.use(passport.initialize());
	}

	// Initialize routes
	initializeRoutes() {
		// Swagger UI
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
		
		this.app.use('/api/auth', authRoutes);
		this.app.use('/api/users', userRoutes);
		this.app.use('/api/products', productRoutes);
		this.app.use('/api/categories', categoryRoutes);
		this.app.use('/api/favoriteProduct', favoriteProductRoutes);
	}

	// Initialize error handling
	initializeErrorHandling() {
		this.app.use(errorHandler);
	}

	// Start the server
	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
			console.log(`API Documentation available at http://localhost:${this.port}/api-docs`);
		});
	}
}

// Create and start the application
const app = new App();
app.listen();
