import AuthService from '../../domain/services/auth.service.js';
import { successCode } from '../../utils/code/authResponseCode.js';
import CustomError from '../../domain/custom/customError.js';
import LoginRequestDTO from '../../domain/dto/auth/loginRequestDTO.js';
import RefreshTokenRequestDTO from '../../domain/dto/auth/refreshTokenRequestDTO.js';
import LoginResponseDTO from '../../domain/dto/auth/loginResponseDTO.js';
import RefreshTokenResponseDTO from '../../domain/dto/auth/refreshTokenResponseDTO.js';
import AuthHelper from '../../utils/authHelpper.js';
import RegisterRequestDTO from '../../domain/dto/auth/registerRequestDTO.js';
import RegisterResponseDTO from '../../domain/dto/auth/registerResponseDTO.js';
import UserService from '../../domain/services/user.service.js';
import UserDTO from '../../domain/dto/user/userDTO.js';
import BaseController from './base.controller.js';
import env from '../../config/env.js';
import BlockUserRequestDTO from '../../domain/dto/auth/blockUserRequestDTO.js';
import UnblockUserRequestDTO from '../../domain/dto/auth/unblockUserRequestDTO.js';
import ResetPasswordRequestDTO from '../../domain/dto/auth/resetPasswordRequestDTO.js';
class AuthController extends BaseController {
	constructor() {
		super();
		this.authService = new AuthService();
		this.userService = new UserService();
	}

	// Handle user login
	async login(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const loginRequest = new LoginRequestDTO(req.body.email, req.body.password);
			const { accessToken, refreshToken, user } = await this.authService.login(
				loginRequest.email,
				loginRequest.password
			);
			const userDTO = UserDTO.fromEntity(user);

			this.setRefreshTokenCookie(res, refreshToken);
			const loginResponse = new LoginResponseDTO(
				accessToken,
				refreshToken,
				userDTO
			);

			this.sendSuccess(
				res,
				successCode.LOGGED_IN.code,
				successCode.LOGGED_IN.message,
				loginResponse,
				successCode.LOGGED_IN.httpStatusCode
			);
		});
	}

	// Handle user registration
	async register(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const registerRequestDTO = RegisterRequestDTO.fromRequest(req.body);
			const user = await this.authService.register(registerRequestDTO);
			const registerResponseDTO = new RegisterResponseDTO(user);

			this.sendSuccess(
				res,
				successCode.REGISTERED_VERIFY_CODE_SENT.code,
				successCode.REGISTERED_VERIFY_CODE_SENT.message,
				registerResponseDTO,
				successCode.REGISTERED_VERIFY_CODE_SENT.httpStatusCode
			);
		});
	}

	// Handle access token refresh
	async refreshAccessToken(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const refreshToken = new RefreshTokenRequestDTO(req.cookies.refreshToken);
			const newAccessToken = await this.authService.refreshAccessToken(
				refreshToken.refreshToken
			);

			const refreshTokenResponse = new RefreshTokenResponseDTO(newAccessToken);
			this.sendSuccess(
				res,
				successCode.ACCESS_TOKEN_REFRESH.code,
				successCode.ACCESS_TOKEN_REFRESH.message,
				refreshTokenResponse,
				successCode.ACCESS_TOKEN_REFRESH.httpStatusCode
			);
		});
	}

	// Handle Google OAuth2 login
	async loginGoogleOauth2(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const payload = { email: req.user.email, role: req.user.role };
			const accessToken = await AuthHelper.generateAccessToken(payload);
			const refreshToken = await AuthHelper.generateRefreshToken(payload);
			const userDTO = UserDTO.fromEntity(req.user);
			this.setRefreshTokenCookie(res, refreshToken);
			const loginResponse = new LoginResponseDTO(
				accessToken,
				refreshToken,
				userDTO
			);

			this.sendSuccess(
				res,
				successCode.LOGGED_IN.code,
				successCode.LOGGED_IN.message,
				loginResponse,
				successCode.LOGGED_IN.httpStatusCode
			);
		});
	}

	// Handle email verification
	async verifyEmailAndLogin(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const token = req.params.token;
			const updatedUser = await this.authService.verifyEmail(token);
			const userDTO = UserDTO.fromEntity(updatedUser);
			const payload = { email: updatedUser.email, role: updatedUser.role };
			const accessToken = await AuthHelper.generateAccessToken(payload);
			const refreshToken = await AuthHelper.generateRefreshToken(payload);

			const loginResponse = new LoginResponseDTO(
				accessToken,
				refreshToken,
				userDTO
			);
			this.sendSuccess(
				res,
				successCode.EMAIL_VERIFIED.code,
				successCode.EMAIL_VERIFIED.message,
				loginResponse,
				successCode.EMAIL_VERIFIED.httpStatusCode
			);
		});
	}

	// Handle verification token resend
	async resendToken(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const email = req.params.email;
			await this.authService.resendToken(email);

			this.sendSuccess(
				res,
				successCode.REGISTERED_VERIFY_CODE_SENT.code,
				successCode.REGISTERED_VERIFY_CODE_SENT.message,
				null,
				successCode.REGISTERED_VERIFY_CODE_SENT.httpStatusCode
			);
		});
	}

	// Handle forgot password request
	async forgotPassword(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const email = req.params.email;
			await this.authService.forgotPassword(email);

			this.sendSuccess(
				res,
				successCode.FORGOT_PASSWORD_VERIFY_EMAIL_SENT.code,
				successCode.FORGOT_PASSWORD_VERIFY_EMAIL_SENT.message,
				null,
				successCode.FORGOT_PASSWORD_VERIFY_EMAIL_SENT.httpStatusCode
			);
		});
	}

	// Handle password reset
	async resetPassword(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const resetPasswordRequestDTO = ResetPasswordRequestDTO.fromRequest(
				req.body
			);
			await this.authService.resetPassword(
				resetPasswordRequestDTO.token,
				resetPasswordRequestDTO.newPassword
			);

			this.sendSuccess(
				res,
				successCode.PASSWORD_RESET_SUCCESS.code,
				successCode.PASSWORD_RESET_SUCCESS.message,
				null,
				successCode.PASSWORD_RESET_SUCCESS.httpStatusCode
			);
		});
	}

	// Handle user logout
	async logout(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			this.clearRefreshTokenCookie(res);

			this.sendSuccess(
				res,
				successCode.LOGGED_OUT.code,
				successCode.LOGGED_OUT.message,
				null,
				successCode.LOGGED_OUT.httpStatusCode
			);
		});
	}

	// Helper method to set refresh token cookie
	setRefreshTokenCookie(res, refreshToken) {
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
			maxAge: env.REFRESH_TOKEN_MAX_AGE_MS,
		});
	}

	// Helper method to clear refresh token cookie
	clearRefreshTokenCookie(res) {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
		});
	}

	async blockUser(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const blockUserRequestDTO = BlockUserRequestDTO.fromRequest(req.body);
			const user = await this.authService.blockUser(
				blockUserRequestDTO.email,
				blockUserRequestDTO.reason
			);
			const userDTO = UserDTO.fromEntity(user);

			this.sendSuccess(
				res,
				successCode.USER_BLOCKED.code,
				successCode.USER_BLOCKED.message,
				userDTO,
				successCode.USER_BLOCKED.httpStatusCode
			);
		});
	}

	async unblockUser(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const unblockUserRequestDTO = UnblockUserRequestDTO.fromRequest(req.body);
			const user = await this.authService.unblockUser(unblockUserRequestDTO.email);
			const userDTO = UserDTO.fromEntity(user);
			this.sendSuccess(
				res,
				successCode.USER_UNBLOCKED.code,
				successCode.USER_UNBLOCKED.message,
				userDTO,
				successCode.USER_UNBLOCKED.httpStatusCode
			);
		});
	}

	async getBlockedUsers(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const users = await this.authService.getBlockedUsers();
			const userDTOs = users.map((user) => UserDTO.fromEntity(user));
			this.sendSuccess(
				res,
				successCode.BLOCKED_USERS_FETCHED.code,
				successCode.BLOCKED_USERS_FETCHED.message,
				userDTOs,
				successCode.BLOCKED_USERS_FETCHED.httpStatusCode
			);
		});
	}

	async getProfile(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const email = req.user.email;
			const user = await this.authService.getProfile(email);
			const userDTO = UserDTO.fromEntity(user);
			this.sendSuccess(
				res,
				successCode.USER_PROFILE_FETCHED.code,
				successCode.USER_PROFILE_FETCHED.message,
				userDTO,
				successCode.USER_PROFILE_FETCHED.httpStatusCode
			);
		});
	}

	async updateProfile(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const email = req.user.email;
			const userData = req.body;
			const updatedUser = await this.authService.updateProfile(email, userData);
			const userDTO = UserDTO.fromEntity(updatedUser);

			this.sendSuccess(
				res,
				successCode.USER_PROFILE_UPDATED.code,
				successCode.USER_PROFILE_UPDATED.message,
				userDTO,
				successCode.USER_PROFILE_UPDATED.httpStatusCode
			);
		});
	}
}

export default AuthController;
