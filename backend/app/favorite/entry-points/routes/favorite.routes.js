import express from 'express';
import FavoriteController from '../controllers/favorite.controller.js';
import { verifyAccessToken } from '../../../auth/entry-points/middlewares/auth.middleware.js';
import {
	validateCreateFavorite,
	validateUpdateFavorite,
	validateFavoriteByEmail,
	validateFavoriteById,
} from '../middlewares/favorite.validation.js';
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
 *               - quantity
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               productId:
 *                 type: string
 *                 description: ID of the product to add to favorites
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add to favorites
 *               note:
 *                 type: string
 *                 description: Optional note about the favorite
 *     responses:
 *       201:
 *         description: Product added to favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     productId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
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
	validateCreateFavorite,
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
 *         description: User's email address
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
	validateFavoriteByEmail,
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
 *         description: User's email address
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to check
 *     responses:
 *       200:
 *         description: Favorite status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     isFavorite:
 *                       type: boolean
 *                     favorite:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         productId:
 *                           type: string
 *                         note:
 *                           type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or product not found
 */
router.get(
	'/:email/:productId',
	verifyAccessToken,
	validateFavoriteByEmail,
	validateFavoriteById,
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
 *         description: User's email address
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 description: Optional note about the favorite
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to update
 *     responses:
 *       200:
 *         description: Favorite product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     productId:
 *                       type: string
 *                     note:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
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
	validateFavoriteByEmail,
	validateFavoriteById,
	validateUpdateFavorite,
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
 *         description: User's email address
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Product removed from favorites successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or product not found
 */
router.delete(
	'/:email/:productId',
	verifyAccessToken,
	validateFavoriteByEmail,
	validateFavoriteById,
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
 *         description: User's email address
 *     responses:
 *       200:
 *         description: All favorite products removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: All favorite products removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete(
	'/:email',
	verifyAccessToken,
	validateFavoriteByEmail,
	favoriteController.removeAllFavoriteProductsByEmail.bind(favoriteController)
);

export default router;
