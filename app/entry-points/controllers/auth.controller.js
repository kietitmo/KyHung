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
			const { accessToken, refreshToken } = await this.authService.login(
				loginRequest.email,
				loginRequest.password
			);

			this.setRefreshTokenCookie(res, refreshToken);
			const loginResponse = new LoginResponseDTO(accessToken, refreshToken);
			
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

			this.setRefreshTokenCookie(res, refreshToken);
			const loginResponse = new LoginResponseDTO(accessToken, refreshToken);
			
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
	async verifyEmail(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const token = req.params.token;
			const updatedUser = await this.authService.verifyEmail(token);
			const responseUser = UserDTO.fromEntity(updatedUser);

			this.sendSuccess(
				res,
				successCode.EMAIL_VERIFIED.code,
				successCode.EMAIL_VERIFIED.message,
				responseUser,
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
			const { token, newPassword } = req.body;
			await this.authService.resetPassword(token, newPassword);

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
			maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
		});
	}

	// Helper method to clear refresh token cookie
	clearRefreshTokenCookie(res) {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict'
		});
	}
}

export default AuthController;
