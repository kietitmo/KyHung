import express from 'express';
import AdminController from '../../entry-points/controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';

import {
	validateUserEmail,
	validateUpdateUser,
	validateCreateUser,
	validateGetAllUser,
} from '../../entry-points/middlewares/user.validation.js';
import Role from '../../domain/models/role.enum.js';

const router = express.Router();

const adminController = new AdminController();

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
 *                       fullName:
 *                         type: string
 *                       role:
 *                         type: string
 *                       state:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
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
 *                       fullName:
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
	validateGetAllUser,
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
 *                     fullName:
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
	validateUserEmail,
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
 *               gender:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
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
	validateCreateUser,
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
 *               fullName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *               gender:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
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
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateUpdateUser,
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
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateUserEmail,
	adminController.deleteUserByEmail.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}/block:
 *   put:
 *     tags: [Admin/Users]
 *     summary: Block user
 *     description: Block a user by admin
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
	validateUserEmail,
	adminController.blockUser.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}/unblock:
 *   put:
 *     tags: [Admin/Users]
 *     summary: Unblock user
 *     description: Unblock a user by admin
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
	validateUserEmail,
	adminController.unblockUser.bind(adminController)
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
	validateUserEmail,
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
	validateUserEmail,
	adminController.activateUser.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/deleted:
 *   get:
 *     tags: [Admin/Users]
 *     summary: Get deleted users
 *     description: Get a list of all soft-deleted users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deleted users retrieved successfully
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
 *                       fullName:
 *                         type: string
 *                       role:
 *                         type: string
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get(
	'/deleted',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getDeletedUsers.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/oauth:
 *   get:
 *     tags: [Admin/Users]
 *     summary: Get OAuth users
 *     description: Get a list of all users who registered via OAuth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of OAuth users retrieved successfully
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
 *                       provider:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get(
	'/oauth',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getOAuthUsers.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}/restore:
 *   get:
 *     tags: [Admin/Users]
 *     summary: Restore deleted user
 *     description: Restore a soft-deleted user
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
 *         description: User restored successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.get(
	'/:email/restore',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateUserEmail,
	adminController.restoreUser.bind(adminController)
);

/**
 * @swagger
 * /api/admin/users/{email}/deleteFromDatabase:
 *   delete:
 *     tags: [Admin/Users]
 *     summary: Permanently delete user
 *     description: Permanently delete a user from the database
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
 *         description: User permanently deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.delete(
	'/:email/deleteFromDatabase',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateUserEmail,
	adminController.deleteUserFromDatabase.bind(adminController)
);

export default router;
