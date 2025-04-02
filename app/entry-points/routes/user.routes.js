import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.controller.js';
import {
	verifyAccessToken,
	authorize,
} from '../middlewares/auth.middleware.js';
import {
	validateCreateUser,
	validateUpdateUser,
	validateGetUser,
	validateDeleteUser,
	validateGetOneUser,
} from '../middlewares/validators/user.validator.js';
import Role from '../../domain/models/role.enum.js';

const userController = new UserController();

router.get(
	'/',
	verifyAccessToken,
	// authorize([Role.ADMIN]),
	validateGetUser,
	userController.getUsers.bind(userController)
);

router.get(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateGetOneUser,
	userController.getUserByEmail.bind(userController)
);

router.post(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateCreateUser,
	userController.createUser.bind(userController)
);

router.put(
	'/:email',
	verifyAccessToken,
	validateUpdateUser,
	userController.updateUserByEmail.bind(userController)
);

router.delete(
	'/:email',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateDeleteUser,
	userController.deleteUserByEmail.bind(userController)
);

export default router;
