import express from 'express';
import AdminController from '../controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../middlewares/auth.middleware.js';
import Role from '../../../user/domain/models/role.enum.js';

const router = express.Router();

const adminController = new AdminController();

router.post(
	'/reset-password-to-default',
	verifyAccessToken,
	authorize(Role.ADMIN),
	adminController.resetPasswordToDefault.bind(adminController)
);

router.post(
	'/verify-account',
	verifyAccessToken,
	authorize(Role.ADMIN),
	adminController.verifyAccount.bind(adminController)
);

export default router;
