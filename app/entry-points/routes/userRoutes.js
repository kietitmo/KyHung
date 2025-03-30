import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import AuthController from '../controllers/authController.js';
import {
	verifyAccessToken,
	authorize,
} from '../middlewares/auth.middleware.js';
import {
	validateCreateUser,
	validateUpdateUser,
	validateGetUser,
	validateDeleteUser,
} from '../middlewares/validators/user.validator.js';
import { validateLogin } from '../middlewares/validators/auth.validator.js';
import Role from '../../domain/models/role.enum.js';

const authController = new AuthController();
const userController = new UserController();

router.post('/login', validateLogin, authController.login.bind(authController));

router.post(
	'/refresh-token',
	authController.refreshAccessToken.bind(authController)
);

router.get(
	'/',
	verifyAccessToken,
	authorize([Role.ADMIN]),
	validateGetUser,
	userController.getUsers.bind(userController)
);

router.post(
	'/register',
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
