import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import {
	verifyGoogleOauth,
	googleLogin,
	verifyAccessToken,
} from '../middlewares/auth.middleware.js';

import loginValidator from '../middlewares/validators/login.validator.js';
import registerValidator from '../middlewares/validators/register.validator.js';
import resetPasswordValidator from '../middlewares/validators/resetPassword.validator.js';

const router = express.Router();

const authController = new AuthController();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Register a new user with email and password
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
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Email already exists
 */
router.post(
	'/register',
	registerValidator,
	authController.register.bind(authController)
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post(
	'/login',
	loginValidator,
	authController.login.bind(authController)
);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     description: Get a new access token using refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid refresh token
 */
router.post(
	'/refresh-token',
	authController.refreshAccessToken.bind(authController)
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout user
 *     description: Logout and invalidate refresh token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post(
	'/logout',
	verifyAccessToken,
	authController.logout.bind(authController)
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password
 *     description: Reset password using reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or password
 */
router.post(
	'/reset-password',
	resetPasswordValidator,
	authController.resetPassword.bind(authController)
);

/**
 * @swagger
 * /api/auth/verify-email/{token}:
 *   get:
 *     tags: [Auth]
 *     summary: Verify email
 *     description: Verify user email with token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid token
 */
router.get(
	'/verify-email/:token',
	authController.verifyEmailAndLogin.bind(authController)
);

/**
 * @swagger
 * /api/auth/resend-token/{email}:
 *   get:
 *     tags: [Auth]
 *     summary: Resend verification token
 *     description: Resend email verification token
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: Token resent successfully
 *       404:
 *         description: User not found
 */
router.get(
	'/resend-token/:email',
	authController.resendToken.bind(authController)
);

/**
 * @swagger
 * /api/auth/forgot-password/{email}:
 *   get:
 *     tags: [Auth]
 *     summary: Request password reset
 *     description: Send password reset email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: Reset email sent successfully
 *       404:
 *         description: User not found
 */
router.get(
	'/forgot-password/:email',
	authController.forgotPassword.bind(authController)
);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth login
 *     description: Redirect to Google OAuth login page
 *     responses:
 *       302:
 *         description: Redirect to Google login
 */
router.get('/google', googleLogin);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth callback
 *     description: Handle Google OAuth callback
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Authentication failed
 */
router.get(
	'/google/callback',
	verifyGoogleOauth,
	authController.loginGoogleOauth2.bind(authController)
);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Get user profile
 *     description: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
	'/profile',
	verifyAccessToken,
	authController.getProfile.bind(authController)
);

export default router;
