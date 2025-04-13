import RefreshTokenResponseDTO from '../../domain/dto/refreshTokenResponseDTO.js';
import AuthHelper from '../../common/utils/authHelpper.js';
import LoginRequestDTO from '../../domain/dto/loginRequestDTO.js';
import RegisterRequestDTO from '../../domain/dto/registerRequestDTO.js';
import RegisterResponseDTO from '../../domain/dto/registerResponseDTO.js';
import UserService from '../../../user/domain/services/user.service.js';
import UserDTO from '../../../user/dto/response/userDTO.js';
import env from '../../../common/config/env.js';
import BlockUserRequestDTO from '../../domain/dto/blockUserRequestDTO.js';
import UnblockUserRequestDTO from '../../domain/dto/unblockUserRequestDTO.js';
import ResetPasswordRequestDTO from '../../domain/dto/resetPasswordRequestDTO.js';
import { successCode } from '../../common/constants/authResponseCode.js';
import AuthService from '../../domain/services/auth.service.js';
import { handleAsync } from '../../../common/utils/helper.js';
import LoginResponseDTO from '../../domain/dto/loginResponseDTO.js';
import APIResponse from '../../../common/custom/apiResponse.js';
class AuthController {
	constructor() {
		this.authService = new AuthService();
	}

	// Handle user login
	async login(req, res, next) {
		await handleAsync(req, res, next, async () => {
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

			const response = {
				message: successCode.LOGGED_IN.message,
				data: loginResponse,
			};

			res.status(successCode.LOGGED_IN.httpStatusCode).json(response);
		});
	}

	// Handle user registration
	async register(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const registerRequestDTO = RegisterRequestDTO.fromRequest(req.body);
			const user = await this.authService.register(registerRequestDTO);
			const registerResponseDTO = new RegisterResponseDTO(user);

			const response = {
				message: successCode.REGISTERED_VERIFY_CODE_SENT.message,
				data: registerResponseDTO,
			};

			res
				.status(successCode.REGISTERED_VERIFY_CODE_SENT.httpStatusCode)
				.json(response);
		});
	}

	// Handle access token refresh
	async refreshAccessToken(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const refreshToken = new RefreshTokenRequestDTO(req.cookies.refreshToken);
			const newAccessToken = await this.authService.refreshAccessToken(
				refreshToken.refreshToken
			);

			const refreshTokenResponse = new RefreshTokenResponseDTO(newAccessToken);
			const response = {
				message: successCode.ACCESS_TOKEN_REFRESH.message,
				data: refreshTokenResponse,
			};

			res.status(successCode.ACCESS_TOKEN_REFRESH.httpStatusCode).json(response);
		});
	}

	// Handle Google OAuth2 login
	async loginGoogleOauth2(req, res, next) {
		await handleAsync(req, res, next, async () => {
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

			const response = APIResponse.success(
				successCode.LOGGED_IN.message,
				loginResponse
			);

			res.status(successCode.LOGGED_IN.httpStatusCode).json(response);
		});
	}

	// Handle email verification
	async verifyEmailAndLogin(req, res, next) {
		await handleAsync(req, res, next, async () => {
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
			const response = APIResponse.success(
				successCode.EMAIL_VERIFIED.message,
				loginResponse
			);

			res.status(successCode.EMAIL_VERIFIED.httpStatusCode).json(response);
		});
	}

	// Handle verification token resend
	async resendToken(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const email = req.params.email;
			await this.authService.resendToken(email);

			const response = APIResponse.success(
				successCode.REGISTERED_VERIFY_CODE_SENT.message,
				null
			);

			res
				.status(successCode.REGISTERED_VERIFY_CODE_SENT.httpStatusCode)
				.json(response);
		});
	}

	// Handle forgot password request
	async forgotPassword(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const email = req.params.email;
			await this.authService.forgotPassword(email);

			const response = APIResponse.success(
				successCode.FORGOT_PASSWORD_VERIFY_EMAIL_SENT.message,
				null
			);

			res
				.status(successCode.FORGOT_PASSWORD_VERIFY_EMAIL_SENT.httpStatusCode)
				.json(response);
		});
	}

	// Handle password reset
	async resetPassword(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const resetPasswordRequestDTO = ResetPasswordRequestDTO.fromRequest(
				req.body
			);
			await this.authService.resetPassword(
				resetPasswordRequestDTO.token,
				resetPasswordRequestDTO.newPassword
			);

			const response = APIResponse.success(
				successCode.PASSWORD_RESET_SUCCESS.message,
				null
			);

			res.status(successCode.PASSWORD_RESET_SUCCESS.httpStatusCode).json(response);
		});
	}

	// Handle user logout
	async logout(req, res, next) {
		await handleAsync(req, res, next, async () => {
			this.clearRefreshTokenCookie(res);

			const response = APIResponse.success(successCode.LOGGED_OUT.message, null);

			res.status(successCode.LOGGED_OUT.httpStatusCode).json(response);
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
		await handleAsync(req, res, next, async () => {
			const blockUserRequestDTO = BlockUserRequestDTO.fromRequest(req.body);
			const user = await this.authService.blockUser(
				blockUserRequestDTO.email,
				blockUserRequestDTO.reason
			);
			const userDTO = UserDTO.fromEntity(user);

			const response = APIResponse.success(
				successCode.USER_BLOCKED.message,
				userDTO
			);

			res.status(successCode.USER_BLOCKED.httpStatusCode).json(response);
		});
	}

	async unblockUser(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const unblockUserRequestDTO = UnblockUserRequestDTO.fromRequest(req.body);
			const user = await this.authService.unblockUser(unblockUserRequestDTO.email);
			const userDTO = UserDTO.fromEntity(user);

			const response = APIResponse.success(
				successCode.USER_UNBLOCKED.message,
				userDTO
			);

			res.status(successCode.USER_UNBLOCKED.httpStatusCode).json(response);
		});
	}

	async getBlockedUsers(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const users = await this.authService.getBlockedUsers();
			const userDTOs = users.map((user) => UserDTO.fromEntity(user));

			const response = APIResponse.success(
				successCode.BLOCKED_USERS_FETCHED.message,
				userDTOs
			);

			res.status(successCode.BLOCKED_USERS_FETCHED.httpStatusCode).json(response);
		});
	}

	async getProfile(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const email = req.user.email;
			const user = await this.authService.getProfile(email);
			const userDTO = UserDTO.fromEntity(user);

			const response = APIResponse.success(
				successCode.USER_PROFILE_FETCHED.message,
				userDTO
			);

			res.status(successCode.USER_PROFILE_FETCHED.httpStatusCode).json(response);
		});
	}

	async updateProfile(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const email = req.user.email;
			const userData = req.body;
			const updatedUser = await this.authService.updateProfile(email, userData);
			const userDTO = UserDTO.fromEntity(updatedUser);

			const response = APIResponse.success(
				successCode.USER_PROFILE_UPDATED.message,
				userDTO
			);

			res.status(successCode.USER_PROFILE_UPDATED.httpStatusCode).json(response);
		});
	}
}

export default AuthController;
