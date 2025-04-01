import express from 'express';
import FavoriteListController from '../controllers/favoriteProduct.controller.js';
import { verifyAccessToken } from '../middlewares/auth.middleware.js';
import { validateFavoriteProduct } from '../middlewares/validators/favoriteProduct.validator.js'
const router = express.Router();
const favoriteListController = new FavoriteListController();
router.post(
	'/',
	verifyAccessToken,
	validateFavoriteProduct,
	favoriteListController.createFavoriteProduct.bind(favoriteListController)
);

router.delete(
	'/',
	verifyAccessToken,
	validateFavoriteProduct,
	favoriteListController.removeFavoriteProduct.bind(favoriteListController)
);

export default router;
