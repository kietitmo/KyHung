import express from 'express';
import UserController from '../../entry-points/controllers/user.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';
import {
	validateUpdateUser,
	validateGetOneUser,
} from '../../entry-points/middlewares/user.validator.js';
import { updateUserValidator } from '../../entry-points/middlewares/userUpdate.validator.js';
import Role from '../../domain/models/role.enum.js';

const router = express.Router();
const userController = new UserController();

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
	userController.getUserByEmail.bind(userController)
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
	updateUserValidator,
	userController.updateUserByEmail.bind(userController)
);

export default router;
