import express from 'express';
import ProductController from '../controllers/product.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../middlewares/auth.middleware.js';
import Role from '../../domain/models/role.enum.js';
import {
	validateCreateProduct,
	validateUpdateProduct,
	validateGetProduct,
} from '../middlewares/validators/product.validator.js';

const router = express.Router();
const productController = new ProductController();

router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateCreateProduct,
	productController.createProduct.bind(productController)
);

router.get(
	'/',
	validateGetProduct,
	productController.getProducts.bind(productController)
);

router.get('/:id', productController.getProductById.bind(productController));

router.put(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateUpdateProduct,
	productController.updateProductById.bind(productController)
);

router.delete(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	productController.deleteProductById.bind(productController)
);

export default router;
