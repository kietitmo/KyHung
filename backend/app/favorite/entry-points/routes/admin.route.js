import express from 'express';
import AdminController from '../controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';
import { validateFavoriteProduct } from '../middlewares/validators/favoriteProduct.validator.js';
import Role from '../../../user/domain/models/role.enum.js';

const router = express.Router();
const adminController = new AdminController();

router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateFavoriteProduct,
	adminController.createFavoriteProduct.bind(adminController)
);

router.get(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getFavoriteProductsByEmail.bind(adminController)
);

router.get(
	'/:email/:productId',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getFavoriteProductsByEmailAndProductId.bind(adminController)
);

router.put(
	'/:email/:productId',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.updateFavoriteProduct.bind(adminController)
);

router.delete(
	'/:email/:productId',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.removeFavoriteProduct.bind(adminController)
);

router.delete(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.removeAllFavoriteProductsByEmail.bind(adminController)
);

export default router;
