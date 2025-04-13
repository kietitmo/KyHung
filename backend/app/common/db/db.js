import mongoose from 'mongoose';
import env from '../config/env.js';
import { logger } from '../middlewares/logger.middleware.js';

const connectDB = async (uri = env.MONGODB_URI) => {
	try {
		mongoose.set('strictQuery', false);

		await mongoose.connect(uri, {
			serverSelectionTimeoutMS: env.DB_CONNECTION_TIMEOUT_MS,
		});

		logger.console(
			`MongoDB connected successfully in ${env.NODE_ENV} environment`
		);

		mongoose.connection.on('error', (err) => {
			logger.console('MongoDB connection error:', err);
		});

		mongoose.connection.on('disconnected', () => {
			logger.console('MongoDB disconnected. Attempting to reconnect...');
		});

		mongoose.connection.on('reconnected', () => {
			logger.console('MongoDB reconnected successfully');
		});

		process.on('SIGINT', async () => {
			try {
				await mongoose.connection.close();
				logger.console('MongoDB connection closed through app termination');
				process.exit(0);
			} catch (err) {
				logger.console('Error closing MongoDB connection:', err);
				process.exit(1);
			}
		});

		return mongoose.connection;
	} catch (error) {
		logger.console('Error connecting to MongoDB:', error);
		setTimeout(() => {
			logger.console('Retrying MongoDB connection...');
			connectDB(uri);
		}, env.DB_RETRY_DELAY_MS);
	}
};

export default connectDB;
