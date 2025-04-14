import express from 'express';
import ProductController from '../controllers/product.controller.js';

import getProductValidator from '../../../category/entry-points/middlewares/categoryGet.validator.js';

const router = express.Router();
const productController = new ProductController();

router.get(
	'/',
	getProductValidator,
	productController.getProducts.bind(productController)
);

router.get('/:id', productController.getProductById.bind(productController));

export default router;
