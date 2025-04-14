import express from 'express';
import AdminController from '../controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';
import Role from '../../../user/domain/models/role.enum.js';
import categoryMiddlewares from '../middlewares/index.js';

const router = express.Router();
const adminController = new AdminController();

router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	categoryMiddlewares.create,
	adminController.createCategory.bind(adminController)
);

router.get(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	categoryMiddlewares.get,
	adminController.getCategories.bind(adminController)
);

router.get(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getCategoryById.bind(adminController)
);

router.put(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	categoryMiddlewares.update,
	adminController.updateCategoryById.bind(adminController)
);

router.delete(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.deleteCategoryById.bind(adminController)
);

export default router;
