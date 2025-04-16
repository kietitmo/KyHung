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

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     tags: [Admin/Products]
 *     summary: Create new product
 *     description: Create a new product by admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	createProductValidator,
	adminController.createProduct.bind(adminController)
);

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     tags: [Admin/Products]
 *     summary: Get all products
 *     description: Get a list of all products with optional filtering and pagination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by name or description
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, name_asc, name_desc]
 *         description: Sort products by field and order
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
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
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       category:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	getProductValidator,
	adminController.getProducts.bind(adminController)
);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   get:
 *     tags: [Admin/Products]
 *     summary: Get product by ID
 *     description: Get detailed information about a specific product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
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
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     category:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Product not found
 */
router.get(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getProductById.bind(adminController)
);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     tags: [Admin/Products]
 *     summary: Update product
 *     description: Update product details by admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Product not found
 */
router.put(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	updateProductValidator,
	adminController.updateProductById.bind(adminController)
);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     tags: [Admin/Products]
 *     summary: Delete product
 *     description: Delete a product by admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Product not found
 */
router.delete(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.deleteProductById.bind(adminController)
);

export default router;
