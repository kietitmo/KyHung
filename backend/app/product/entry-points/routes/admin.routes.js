import express from 'express';
import AdminController from '../controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';
import Role from '../../../user/domain/models/role.enum.js';

import createProductValidator from '../../../category/entry-points/middlewares/categoryCreate.validator.js';
import updateProductValidator from '../../../category/entry-points/middlewares/categoryUpdate.validator.js';
import getProductValidator from '../../../category/entry-points/middlewares/categoryGet.validator.js';

const router = express.Router();
const adminController = new AdminController();

router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	createProductValidator,
	adminController.createProduct.bind(adminController)
);

router.get(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	getProductValidator,
	adminController.getProducts.bind(adminController)
);

router.get(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getProductById.bind(adminController)
);

router.put(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	updateProductValidator,
	adminController.updateProductById.bind(adminController)
);

router.delete(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.deleteProductById.bind(adminController)
);

export default router;
