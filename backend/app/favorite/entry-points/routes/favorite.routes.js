import express from 'express';
import FavoriteController from '../controllers/favorite.controller.js';
import { verifyAccessToken } from '../../../auth/entry-points/middlewares/auth.middleware.js';
import { validateFavoriteProduct } from '../middlewares/validators/favoriteProduct.validator.js';
const router = express.Router();
const favoriteController = new FavoriteController();

/**
 * @swagger
 * /api/favorite:
 *   post:
 *     tags: [Favorites]
 *     summary: Add product to favorites
 *     description: Add a product to user's favorite list
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - productId
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
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
 *         description: User or product not found
 */
router.post(
	'/',
	verifyAccessToken,
	validateFavoriteProduct,
	favoriteController.createFavoriteProduct.bind(favoriteController)
);

/**
 * @swagger
 * /api/favorite/{email}:
 *   get:
 *     tags: [Favorites]
 *     summary: Get user's favorite products
 *     description: Get all favorite products for a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: List of favorite products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       productId:
 *                         type: string
 *                       product:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           price:
 *                             type: number
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get(
	'/:email',
	verifyAccessToken,
	favoriteController.getFavoriteProductsByEmail.bind(favoriteController)
);

/**
 * @swagger
 * /api/favorite/{email}/{productId}:
 *   get:
 *     tags: [Favorites]
 *     summary: Check if product is in favorites
 *     description: Check if a specific product is in user's favorite list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favorite status retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or product not found
 */
router.get(
	'/:email/:productId',
	verifyAccessToken,
	favoriteController.getFavoriteProductsByEmailAndProductId.bind(
		favoriteController
	)
);

/**
 * @swagger
 * /api/favorite/{email}/{productId}:
 *   put:
 *     tags: [Favorites]
 *     summary: Update favorite product
 *     description: Update a product in user's favorite list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite product updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or product not found
 */
router.put(
	'/:email/:productId',
	verifyAccessToken,
	favoriteController.updateFavoriteProduct.bind(favoriteController)
);

/**
 * @swagger
 * /api/favorite/{email}/{productId}:
 *   delete:
 *     tags: [Favorites]
 *     summary: Remove product from favorites
 *     description: Remove a specific product from user's favorite list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from favorites successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or product not found
 */
router.delete(
	'/:email/:productId',
	verifyAccessToken,
	favoriteController.removeFavoriteProduct.bind(favoriteController)
);

/**
 * @swagger
 * /api/favorite/{email}:
 *   delete:
 *     tags: [Favorites]
 *     summary: Remove all favorite products
 *     description: Remove all products from user's favorite list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: All favorite products removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete(
	'/:email',
	verifyAccessToken,
	favoriteController.removeAllFavoriteProductsByEmail.bind(favoriteController)
);

export default router;
