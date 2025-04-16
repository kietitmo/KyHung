import express from 'express';
import AdminController from '../../entry-points/controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';

import { createUserValidator } from '../../entry-points/middlewares/userCreate.validator.js';
import { updateUserValidator } from '../../entry-points/middlewares/userUpdate.validator.js';
import { getUserValidator } from '../../entry-points/middlewares/userGet.validator.js';
import Role from '../../domain/models/role.enum.js';

const router = express.Router();

const adminController = new AdminController();

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     tags: [Admin/Users]
 *     summary: Get all users
 *     description: Get a list of all users with optional filtering and pagination
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
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter users by email, firstName, or lastName
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [USER, ADMIN]
 *         description: Filter by user role
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [email_asc, email_desc, name_asc, name_desc]
 *         description: Sort users by field and order
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
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
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       role:
 *                         type: string
 *                       isBlocked:
 *                         type: boolean
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
	getUserValidator,
	adminController.getUsers.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}:
 *   get:
 *     tags: [Admin/Users]
 *     summary: Get user by email
 *     description: Get detailed information about a specific user
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
 *         description: User details retrieved successfully
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
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     role:
 *                       type: string
 *                     isBlocked:
 *                       type: boolean
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
 *         description: User not found
 */
router.get(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getUserByEmail.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     tags: [Admin/Users]
 *     summary: Create new user
 *     description: Create a new user by admin
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
 *               - firstName
 *               - lastName
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               firstName:
 *                 type: string
 *               lastName:
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
 *         description: Forbidden - Admin access required
 *       409:
 *         description: Email already exists
 */
router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	createUserValidator,
	adminController.createUser.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}:
 *   put:
 *     tags: [Admin/Users]
 *     summary: Update user
 *     description: Update user details by admin
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.put(
	'/update/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	updateUserValidator,
	adminController.updateUserByEmail.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}:
 *   delete:
 *     tags: [Admin/Users]
 *     summary: Delete user
 *     description: Delete a user by admin
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
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.delete(
	'/:email/delete',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.deleteUserByEmail.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/block:
 *   put:
 *     tags: [Admin/Users]
 *     summary: Block user
 *     description: Block a user by admin
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
 *               - blockedReason
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               blockedReason:
 *                 type: string
 *                 description: Reason for blocking the user
 *     responses:
 *       200:
 *         description: User blocked successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.put(
	'/:email/block',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.blockUser.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/unblock:
 *   put:
 *     tags: [Admin/Users]
 *     summary: Unblock user
 *     description: Unblock a user by admin
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
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.put(
	'/:email/unblock',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.unblockUser.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/blocked:
 *   get:
 *     tags: [Admin/Users]
 *     summary: Get blocked users
 *     description: Get a list of all blocked users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of blocked users retrieved successfully
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
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       role:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get(
	'/blocked',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getBlockedUsers.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     tags: [Admin/Users]
 *     summary: Get user by ID
 *     description: Get detailed information about a specific user by ID
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
 *         description: User details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.get(
	'/:id',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getUserById.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}/role:
 *   put:
 *     tags: [Admin/Users]
 *     summary: Update user role
 *     description: Update the role of a user by admin
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
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.put(
	'/:email/role',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.setUserRole.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}/activate:
 *   put:
 *     tags: [Admin/Users]
 *     summary: Activate user
 *     description: Activate a user by admin
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
 *         description: User activated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.put(
	'/:email/activate',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.activateUser.bind(adminController)
);

router.get(
	'/deleted',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getDeletedUsers.bind(adminController)
);

router.get(
	'/oauth',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getOAuthUsers.bind(adminController)
);

router.get(
	'/:email/restore',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.restoreUser.bind(adminController)
);

router.delete(
	'/:email/deleteFromDatabase',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.deleteUserFromDatabase.bind(adminController)
);

export default router;
