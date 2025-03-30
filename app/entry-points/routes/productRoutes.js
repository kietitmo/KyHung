import express from 'express';
import ProductController from '../controllers/productController.js';
import {
	verifyAccessToken,
	authorize,
} from '../middlewares/auth.middleware.js';
import Role from '../../domain/models/role.enum.js';

const router = express.Router();

router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	ProductController.createProduct
);

router.get('/', ProductController.getProducts);

router.get('/:id', ProductController.getProductById);

router.put(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	ProductController.updateProductById
);

router.delete(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	ProductController.deleteProductById
);

export default router;
