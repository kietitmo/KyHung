import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './data-access/db/db.js';
import userRoutes from './entry-points/routes/userRoutes.js';
import productRoutes from './entry-points/routes/productRoutes.js';
import 'module-alias/register.js';
import passport from 'passport';
import './config/passportConfig.js'; // Cấu hình passport
import errorHandler from './middlewares/errorHandler.js'; // Import middleware xử lý lỗi

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); // Khởi tạo passport

// Các route của user
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`User Service is running on port ${PORT}`);
});
