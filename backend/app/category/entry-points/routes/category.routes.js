import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import categoryMiddlewares from '../middlewares/index.js';
const router = express.Router();
const categoryController = new CategoryController();

router.get(
	'/',
	categoryMiddlewares.get,
	categoryController.getCategories.bind(categoryController)
);
router.get('/:id', categoryController.getCategoryById.bind(categoryController));

export default router;
