import AuthService from '../../domain/services/auth.service.js';
import APIResponse from '../../domain/custom/apiResponse.js';
import { errorCode, successCode } from '../../utils/userResponseCode.js';
import CustomError from '../../domain/custom/customError.js';
import LoginRequestDTO from '../../domain/dto/loginRequestDTO.js';
import RefreshTokenRequestDTO from '../../domain/dto/refreshTokenRequestDTO.js';
import LoginResponseDTO from '../../domain/dto/loginResponseDTO.js';
import RefreshTokenResponseDTO from '../../domain/dto/refreshTokenResponseDTO.js';

// Đăng nhập và nhận JWT
class AuthController {
	constructor() {
		this.authService = new AuthService();
	}

	async login(req, res, next) {
		try {
			// Chuyển req.body thành DTO
			const loginRequest = new LoginRequestDTO(req.body.email, req.body.password);

			// Gọi service để thực hiện login
			const { accessToken, refreshToken } = await this.authService.login(
				loginRequest.email,
				loginRequest.password
			);

			// Lưu refresh token vào cookie
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'Strict',
				maxAge: 60 * 60 * 24 * 7 * 1000, // 7 ngày
			});

			// Trả về response theo DTO
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
			// Lấy refresh token từ cookies và chuyển thành DTO
			const refreshToken = new RefreshTokenRequestDTO(req.cookies.refreshToken);

			if (!refreshToken) {
				throw new CustomError(errorCode.REFRESH_TOKEN_NOT_FOUND);
			}

			// Gọi service để làm mới access token
			const newAccessToken = await this.authService.refreshAccessToken(
				refreshToken.refreshToken
			);

			// Trả về response theo DTO
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
