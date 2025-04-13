import express from 'express';
import AdminController from '../../entry-points/controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';
import {
	validateCreateUser,
	validateUpdateUser,
	validateGetUser,
	validateDeleteUser,
	validateGetOneUser,
} from '../../entry-points/middlewares/user.validator.js';
import Role from '../../domain/models/role.enum.js';

const router = express.Router();

const adminController = new AdminController();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: filter
 *         schema:
 *           type: object
 *           default: {}
 *         description: filter
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateGetUser,
	adminController.getUsers.bind(adminController)
);

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
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
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.get(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateGetOneUser,
	adminController.getUserByEmail.bind(adminController)
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
 *               - password
 *               - fullName
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               fullName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Email already exists
 */
router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateCreateUser,
	adminController.createUser.bind(adminController)
);

/**
 * @swagger
 * /api/users/{email}:
 *   put:
 *     summary: Update user by email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateUpdateUser,
	adminController.updateUserByEmail.bind(adminController)
);

/**
 * @swagger
 * /api/users/{email}:
 *   delete:
 *     summary: Delete user by email
 *     tags: [Users]
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
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.delete(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateDeleteUser,
	adminController.deleteUserByEmail.bind(adminController)
);

export default router;
