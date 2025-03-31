import mongoose from 'mongoose';
import Config from '../../config/config.js';

const connectDB = async () => {
	try {
		await mongoose.connect(Config.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('User Service connected to DB');
	} catch (error) {
		console.error('Error connecting to DB', error);
		process.exit(1);
	}
};

export default connectDB;
