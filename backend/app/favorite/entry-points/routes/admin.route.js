import express from 'express';
import AdminController from '../controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';
import {
	validateCreateFavorite,
	validateUpdateFavorite,
	validateFavoriteByEmail,
	validateFavoriteById,
} from '../middlewares/favorite.validation.js';
import Role from '../../../user/domain/models/role.enum.js';

const router = express.Router();
const adminController = new AdminController();

/**
 * @swagger
 * /api/admin/favorite:
 *   post:
 *     tags: [Admin Favorites]
 *     summary: Add product to favorites (Admin)
 *     description: Add a product to user's favorite list (Admin only)
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
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added to favorites successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User or product not found
 */
router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateCreateFavorite,
	adminController.createFavoriteProduct.bind(adminController)
);

/**
 * @swagger
 * /api/admin/favorite/{email}:
 *   get:
 *     tags: [Admin Favorites]
 *     summary: Get user's favorite products (Admin)
 *     description: Get all favorite products for a specific user (Admin only)
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
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.get(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateFavoriteByEmail,
	adminController.getFavoriteProductsByEmail.bind(adminController)
);

/**
 * @swagger
 * /api/admin/favorite/{email}/{productId}:
 *   get:
 *     tags: [Admin Favorites]
 *     summary: Check if product is in favorites (Admin)
 *     description: Check if a specific product is in user's favorite list (Admin only)
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
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User or product not found
 */
router.get(
	'/:email/:productId',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateFavoriteByEmail,
	validateFavoriteById,
	adminController.getFavoriteProductsByEmailAndProductId.bind(adminController)
);

/**
 * @swagger
 * /api/admin/favorite/{email}/{productId}:
 *   put:
 *     tags: [Admin Favorites]
 *     summary: Update favorite product (Admin)
 *     description: Update a product in user's favorite list (Admin only)
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
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Favorite product updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User or product not found
 */
router.put(
	'/:email/:productId',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateFavoriteByEmail,
	validateFavoriteById,
	validateUpdateFavorite,
	adminController.updateFavoriteProduct.bind(adminController)
);

/**
 * @swagger
 * /api/admin/favorite/{email}/{productId}:
 *   delete:
 *     tags: [Admin Favorites]
 *     summary: Remove product from favorites (Admin)
 *     description: Remove a specific product from user's favorite list (Admin only)
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
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User or product not found
 */
router.delete(
	'/:email/:productId',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateFavoriteByEmail,
	validateFavoriteById,
	adminController.removeFavoriteProduct.bind(adminController)
);

/**
 * @swagger
 * /api/admin/favorite/{email}:
 *   delete:
 *     tags: [Admin Favorites]
 *     summary: Remove all favorite products (Admin)
 *     description: Remove all products from user's favorite list (Admin only)
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
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.delete(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateFavoriteByEmail,
	adminController.removeAllFavoriteProductsByEmail.bind(adminController)
);

export default router;
