import AuthService from '../../domain/services/auth.service.js';
import APIResponse from '../../domain/custom/apiResponse.js';
import { errorCode, successCode } from '../../utils/authResponseCode.js';
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

class AuthController {
	constructor() {
		this.authService = new AuthService();
		this.userService = new UserService();
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

	async register(req, res, next) {
		try {
			const registerRequestDTO = RegisterRequestDTO.fromRequest(req.body);
			const user = await this.authService.register(registerRequestDTO)
			const registerResponseDTO = new RegisterResponseDTO(user);

			const response = APIResponse.success(
				successCode.REGISTERED_VERIFY_CODE_SENT.code,
				successCode.REGISTERED_VERIFY_CODE_SENT.message,
				registerResponseDTO
			);
			return res.status(successCode.REGISTERED_VERIFY_CODE_SENT.httpStatusCode).json(response);
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

	async loginGoogleOauth2(req, res, next) {
		try {
			const payload = { email: req.user.email, role: req.user.role }

			const accessToken = await AuthHelper.generateAccessToken(payload) 
			const refreshToken = await AuthHelper.generateRefreshToken(payload) 

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

	async verifyEmail(req, res, next) {
		try {
			const token = req.params.token;
			
			const updatedUser = await this.authService.verifyEmail(token)
			const responseUser = UserDTO.fromEntity(updatedUser)

			const response = APIResponse.success(
				successCode.REGISTERED.code,
				successCode.REGISTERED.message,
				responseUser
			);

			return res.status(successCode.REGISTERED.httpStatusCode).json(response);

		} catch (error) {
		  next(error);
		}
	}	

	async resendToken(req, res, next) {
		try {
			const email = req.params.email;
			await this.authService.resendToken(email)

			const response = APIResponse.success(
				successCode.REGISTERED_VERIFY_CODE_SENT.code,
				successCode.REGISTERED_VERIFY_CODE_SENT.message,
				null
			);

			return res.status(successCode.REGISTERED_VERIFY_CODE_SENT.httpStatusCode).json(response);

		} catch (error) {
		  next(error);
		}
	}
}

export default AuthController;
