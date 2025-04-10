import mongoose from 'mongoose';
import env from '../../config/env.js';

/**
 * Connect to MongoDB database
 * @param {string} uri - MongoDB connection URI
 * @returns {Promise} - Resolves when connected to database
 */
const connectDB = async (uri = env.MONGODB_URI) => {
	try {
		// Set mongoose options
		mongoose.set('strictQuery', false);
		
		// Connect to MongoDB
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: env.DB_CONNECTION_TIMEOUT_MS, // Timeout after configured time
		});
		
		console.log(`MongoDB connected successfully in ${env.NODE_ENV} environment`);
		
		// Set up event listeners
		mongoose.connection.on('error', (err) => {
			console.error('MongoDB connection error:', err);
		});
		
		mongoose.connection.on('disconnected', () => {
			console.warn('MongoDB disconnected. Attempting to reconnect...');
		});
		
		mongoose.connection.on('reconnected', () => {
			console.log('MongoDB reconnected successfully');
		});
		
		// Handle process termination
		process.on('SIGINT', async () => {
			try {
				await mongoose.connection.close();
				console.log('MongoDB connection closed through app termination');
				process.exit(0);
			} catch (err) {
				console.error('Error closing MongoDB connection:', err);
				process.exit(1);
			}
		});
		
		return mongoose.connection;
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		// Retry connection after configured delay
		setTimeout(() => {
			console.log('Retrying MongoDB connection...');
			connectDB(uri);
		}, env.DB_RETRY_DELAY_MS);
	}
};

export default connectDB;
