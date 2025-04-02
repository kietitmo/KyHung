import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './data-access/db/db.js';
import authRoutes from './entry-points/routes/auth.routes.js'
import userRoutes from './entry-points/routes/user.routes.js';
import productRoutes from './entry-points/routes/product.routes.js';
import categoryRoutes from './entry-points/routes/category.routes.js';
import favoriteProductRoutes from './entry-points/routes/favoriteProduct.routes.js';
import 'module-alias/register.js';
import passport from 'passport';
import './config/passportConfig.js';
import errorHandler from './entry-points/middlewares/error.middleware.js';
import Config from './config/config.js';

const app = express();
const PORT = Config.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Các route của user
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/favoriteProduct', favoriteProductRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`User Service is running on port ${PORT}`);
});
