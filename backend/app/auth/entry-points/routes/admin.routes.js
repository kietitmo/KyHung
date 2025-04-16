import express from 'express';
import AdminController from '../controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../middlewares/auth.middleware.js';
import Role from '../../../user/domain/models/role.enum.js';

const router = express.Router();

const adminController = new AdminController();

/**
 * @swagger
 * /api/admin/auth/reset-password-to-default:
 *   post:
 *     tags: [Admin/Auth]
 *     summary: Reset user password to default
 *     description: Reset a user's password to the default password
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
 *         description: Password reset successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.post(
	'/reset-password-to-default',
	verifyAccessToken,
	authorize(Role.ADMIN),
	adminController.resetPasswordToDefault.bind(adminController)
);

/**
 * @swagger
 * /api/admin/auth/verify-account:
 *   post:
 *     tags: [Admin/Auth]
 *     summary: Verify user account
 *     description: Verify a user's account by admin
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
 *         description: Account verified successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.post(
	'/verify-account',
	verifyAccessToken,
	authorize(Role.ADMIN),
	adminController.verifyAccount.bind(adminController)
);

export default router;
