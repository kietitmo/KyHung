import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import AuthController from '../controllers/authController.js';
import { verifyAccessToken } from '../middlewares/authMiddleware.js';
import validateCreateUser from '../middlewares/validators/validateCreateUser.js';

// Đăng nhập và nhận access token + refresh token
router.post('/login', AuthController.login);

// Làm mới access token từ refresh token
router.post('/refresh-token', AuthController.refreshAccessToken);

// Các route khác yêu cầu xác thực JWT
router.get('/', verifyAccessToken, UserController.getUsers); // Được bảo vệ bằng JWT

router.post(
	'/',
	verifyAccessToken,
	validateCreateUser,
	UserController.createUser
);
router.put('/:email', verifyAccessToken, UserController.updateUserByEmail);
router.delete('/:email', verifyAccessToken, UserController.deleteUserByEmail);

router.post(
	'/:email/favorites/:productId',
	verifyAccessToken,
	UserController.addFavorite
);

export default router;
