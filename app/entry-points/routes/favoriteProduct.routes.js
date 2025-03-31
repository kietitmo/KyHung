import express from 'express';
import FavoriteListController from '../controllers/favoriteProduct.controller.js';
import { verifyAccessToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
const favoriteListController = new FavoriteListController();
router.post(
	'/',
	verifyAccessToken,
	favoriteListController.createFavoriteProduct.bind(favoriteListController)
);

router.delete(
	'/',
	verifyAccessToken,
	favoriteListController.removeFavoriteProduct.bind(favoriteListController)
);

export default router;
