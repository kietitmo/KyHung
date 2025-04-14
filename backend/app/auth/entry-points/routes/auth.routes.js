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

router.post(
	'/register',
	registerValidator,
	authController.register.bind(authController)
);

router.post(
	'/login',
	loginValidator,
	authController.login.bind(authController)
);

router.post(
	'/refresh-token',
	authController.refreshAccessToken.bind(authController)
);

router.post(
	'/logout',
	verifyAccessToken,
	authController.logout.bind(authController)
);

router.post(
	'/reset-password',
	resetPasswordValidator,
	authController.resetPassword.bind(authController)
);

router.get(
	'/verify-email/:token',
	authController.verifyEmailAndLogin.bind(authController)
);

router.get(
	'/resend-token/:email',
	authController.resendToken.bind(authController)
);

router.get(
	'/forgot-password/:email',
	authController.forgotPassword.bind(authController)
);

router.get('/google', googleLogin);

router.get(
	'/google/callback',
	verifyGoogleOauth,
	authController.loginGoogleOauth2.bind(authController)
);

router.get(
	'/profile',
	verifyAccessToken,
	authController.getProfile.bind(authController)
);

export default router;
