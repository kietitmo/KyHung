import express from 'express';
import UserController from '../../entry-points/controllers/user.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../../../auth/entry-points/middlewares/auth.middleware.js';
import { updateUserValidator } from '../../entry-points/middlewares/userUpdate.validator.js';
import Role from '../../domain/models/role.enum.js';

const router = express.Router();
const userController = new UserController();

router.get(
	'/:email',
	verifyAccessToken,
	authorize([Role.USER]),
	userController.getUserByEmail.bind(userController)
);

router.put(
	'/:email',
	verifyAccessToken,
	authorize([Role.USER]),
	updateUserValidator,
	userController.updateUserByEmail.bind(userController)
);

export default router;
