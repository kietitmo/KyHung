import express from 'express';
import FavoriteListController from '../../domain/services/favoriteProduct.service.js';
import { verifyAccessToken } from '../../../auth/entry-points/middlewares/auth.middleware.js';
import { validateFavoriteProduct } from '../../entry-points/middlewares/validators/favoriteProduct.validator.js';
const router = express.Router();
const favoriteListController = new FavoriteListController();

/**
 * @swagger
 * /api/favoriteProduct:
 *   post:
 *     summary: Add a product to favorites
 *     tags: [Favorite Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added to favorites successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post(
	'/',
	verifyAccessToken,
	validateFavoriteProduct,
	favoriteListController.createFavoriteProduct.bind(favoriteListController)
);

/**
 * @swagger
 * /api/favoriteProduct:
 *   delete:
 *     summary: Remove a product from favorites
 *     tags: [Favorite Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product removed from favorites successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in favorites
 */
router.delete(
	'/',
	verifyAccessToken,
	validateFavoriteProduct,
	favoriteListController.removeFavoriteProduct.bind(favoriteListController)
);

/**
 * @swagger
 * /api/favoriteProduct/{email}:
 *   get:
 *     summary: Get all favorite products
 *     tags: [Favorite Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user
 *         example: "user@example.com"
 *     responses:
 *       200:
 *         description: Favorite products retrieved successfully
 */

router.get(
	'/:email',
	verifyAccessToken,
	favoriteListController.getFavoriteProducts.bind(favoriteListController)
);

export default router;
