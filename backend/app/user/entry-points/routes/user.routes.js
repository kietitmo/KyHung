import express from 'express';
import UserController from '../../entry-points/controllers/user.controller.js';
import { verifyAccessToken } from '../../../auth/entry-points/middlewares/auth.middleware.js';
import {
	validateUserEmail,
	validateUpdateUser,
} from '../../entry-points/middlewares/user.validation.js';

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by email
 *     description: Get user details by email address
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
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 role:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
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
	validateUserEmail,
	userController.getUserByEmail.bind(userController)
);

/**
 * @swagger
 * /api/users:
 *   put:
 *     tags: [Users]
 *     summary: Update user by email
 *     description: Update user details by email address
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.put(
	'/',
	verifyAccessToken,
	validateUpdateUser,
	userController.updateUserByEmail.bind(userController)
);

export default router;
