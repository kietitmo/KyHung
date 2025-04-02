import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import {
	verifyGoogleOauth,
	googleLogin
} from '../middlewares/auth.middleware.js';
import { validateLogin, validateRegister } from '../middlewares/validators/auth.validator.js';

const router = express.Router();

const authController = new AuthController();

router.post(
	'/register',
	validateRegister,
	authController.register.bind(authController)
);

router.post('/login', validateLogin, authController.login.bind(authController));

router.post(
	'/refresh-token',
	authController.refreshAccessToken.bind(authController).bind(authController)
);

router.get('/verify-email/:token', authController.verifyEmail.bind(authController))
router.get('/resend-token/:email', authController.resendToken.bind(authController))

router.get('/google', googleLogin);

router.get('/google/callback', verifyGoogleOauth, authController.loginGoogleOauth2.bind(authController));

export default router;

