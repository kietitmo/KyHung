import express from 'express';
import AdminController from '../../entry-points/controllers/admin.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';

import { createUserValidator } from '../../entry-points/middlewares/userCreate.validator.js';
import { updateUserValidator } from '../../entry-points/middlewares/userUpdate.validator.js';
import { blockUserValidator } from '../../entry-points/middlewares/userBlock.validator.js';
import { getUserValidator } from '../../entry-points/middlewares/userGet.validator.js';
import Role from '../../domain/models/role.enum.js';

const router = express.Router();

const adminController = new AdminController();

router.get(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	getUserValidator,
	adminController.getUsers.bind(adminController)
);

router.get(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getUserByEmail.bind(adminController)
);

router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	createUserValidator,
	adminController.createUser.bind(adminController)
);

router.put(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	updateUserValidator,
	adminController.updateUserByEmail.bind(adminController)
);

router.delete(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.deleteUserByEmail.bind(adminController)
);

router.put(
	'/block',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	blockUserValidator,
	adminController.blockUser.bind(adminController)
);

router.put(
	'/unblock',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.unblockUser.bind(adminController)
);

router.get(
	'/blocked',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	adminController.getBlockedUsers.bind(adminController)
);

export default router;
