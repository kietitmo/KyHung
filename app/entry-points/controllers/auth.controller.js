import AuthService from '../../domain/services/auth.service.js';
import APIResponse from '../../domain/custom/apiResponse.js';
import { errorCode, successCode } from '../../utils/userResponseCode.js';
import CustomError from '../../domain/custom/customError.js';
import LoginRequestDTO from '../../domain/dto/auth/loginRequestDTO.js';
import RefreshTokenRequestDTO from '../../domain/dto/auth/refreshTokenRequestDTO.js';
import LoginResponseDTO from '../../domain/dto/auth/loginResponseDTO.js';
import RefreshTokenResponseDTO from '../../domain/dto/auth/refreshTokenResponseDTO.js';

class AuthController {
	constructor() {
		this.authService = new AuthService();
	}

	async login(req, res, next) {
		try {
			const loginRequest = new LoginRequestDTO(req.body.email, req.body.password);

			const { accessToken, refreshToken } = await this.authService.login(
				loginRequest.email,
				loginRequest.password
			);

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'Strict',
				maxAge: 60 * 60 * 24 * 7 * 1000,
			});

			const loginResponse = new LoginResponseDTO(accessToken, refreshToken);
			const response = APIResponse.success(
				successCode.LOGGED_IN.code,
				successCode.LOGGED_IN.message,
				loginResponse
			);
			return res.status(successCode.LOGGED_IN.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async refreshAccessToken(req, res, next) {
		try {
			const refreshToken = new RefreshTokenRequestDTO(req.cookies.refreshToken);

			if (!refreshToken) {
				throw new CustomError(errorCode.REFRESH_TOKEN_NOT_FOUND);
			}

			const newAccessToken = await this.authService.refreshAccessToken(
				refreshToken.refreshToken
			);

			const refreshTokenResponse = new RefreshTokenResponseDTO(newAccessToken);
			const response = APIResponse.success(
				successCode.ACCESS_TOKEN_REFRESH.code,
				successCode.ACCESS_TOKEN_REFRESH.message,
				refreshTokenResponse
			);

			return res
				.status(successCode.ACCESS_TOKEN_REFRESH.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;
