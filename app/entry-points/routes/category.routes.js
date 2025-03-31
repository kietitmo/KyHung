import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../middlewares/auth.middleware.js';
import Role from '../../domain/models/role.enum.js';

const router = express.Router();
const categoryController = new CategoryController()
router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	categoryController.createCategory.bind(categoryController)
);

router.get('/', categoryController.getCategories.bind(categoryController));

router.get('/:id', categoryController.getCategoryById.bind(categoryController));

router.put(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	categoryController.updateCategoryById.bind(categoryController)
);

router.delete(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	categoryController.deleteCategoryById.bind(categoryController)
);

export default router;
