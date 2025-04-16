import express from 'express';
import AdminController from '../controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';
import Role from '../../../user/domain/models/role.enum.js';
import categoryMiddlewares from '../middlewares/index.js';

import createCategoryValidator from '../middlewares/categoryCreate.validator.js';
import updateCategoryValidator from '../middlewares/categoryUpdate.validator.js';
import getCategoryValidator from '../middlewares/categoryGet.validator.js';

const router = express.Router();
const adminController = new AdminController();

/**
 * @swagger
 * /api/admin/categories:
 *   post:
 *     tags: [Admin/Categories]
 *     summary: Create new category
 *     description: Create a new product category by admin
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
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
	createCategoryValidator,
	adminController.createCategory.bind(adminController)
);

/**
 * @swagger
 * /api/admin/categories:
 *   get:
 *     tags: [Admin/Categories]
 *     summary: Get all categories
 *     description: Get a list of all categories with optional filtering and pagination
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Search categories by name or description
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [name_asc, name_desc]
 *         description: Sort categories by name
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
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
	getCategoryValidator,
	adminController.getCategories.bind(adminController)
);

/**
 * @swagger
 * /api/admin/categories/{id}:
 *   get:
 *     tags: [Admin/Categories]
 *     summary: Get category by ID
 *     description: Get detailed information about a specific category
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
 *         description: Category details retrieved successfully
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
 *         description: Category not found
 */
router.get(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getCategoryById.bind(adminController)
);

/**
 * @swagger
 * /api/admin/categories/{id}:
 *   put:
 *     tags: [Admin/Categories]
 *     summary: Update category
 *     description: Update category details by admin
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
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Category not found
 */
router.put(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	updateCategoryValidator,
	adminController.updateCategoryById.bind(adminController)
);

/**
 * @swagger
 * /api/admin/categories/{id}:
 *   delete:
 *     tags: [Admin/Categories]
 *     summary: Delete category
 *     description: Delete a category by admin
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
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Category not found
 */
router.delete(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.deleteCategoryById.bind(adminController)
);

export default router;
