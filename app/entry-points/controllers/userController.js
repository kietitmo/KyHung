import UserService from '../../domain/services/userService.js';
import APIResponse from '../../domain/dto/apiResponse.js';
import CreateUserDTO from '../../domain/dto/createUserDTO.js';
import UserDTO from '../../domain/dto/userDTO.js';
import GetUserRequestDTO from '../../domain/dto/getUserRequestDTO.js';
import { successCode } from '../../utils/userResponseCode.js';
import UpdateUserDTO from '../../domain/dto/updateUserDTO.js';

class UserController {
	constructor() {
		this.userService = new UserService();
	}
	async createUser(req, res, next) {
		try {
			const userRequest = CreateUserDTO.fromRequest(req.body);
			const user = await this.userService.createUser(userRequest);
			const userResponse = UserDTO.fromEntity(user);
			const response = APIResponse.success(
				successCode.USER_CREATED.code,
				successCode.USER_CREATED.message,
				userResponse
			);
			return res.status(successCode.USER_CREATED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async getUsers(req, res, next) {
		try {
			const getUserRequest = GetUserRequestDTO.fromRequest(req.body);
			const userResponse = await this.userService.getUsers(getUserRequest);

			const response = APIResponse.success(
				successCode.USERS_GET_ALL.code,
				successCode.USERS_GET_ALL.message,
				userResponse
			);
			return res.status(successCode.USERS_GET_ALL.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async getUserByEmail(req, res, next) {
		try {
			const user = await this.userService.getUserByEmail(req.params.email);
			const userResponse = UserDTO.fromEntity(user);
			const response = APIResponse.success(
				successCode.USER_GET.code,
				successCode.USER_GET.message,
				userResponse
			);
			return res.status(successCode.USER_GET.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async updateUserByEmail(req, res, next) {
		try {
			const updateUser = UpdateUserDTO.fromRequest(req.body);
			const user = await this.userService.updateUserByEmail(
				req.params.email,
				updateUser
			);

			const userResponse = UserDTO.fromEntity(user);
			const response = APIResponse.success(
				successCode.USER_UPDATED.code,
				successCode.USER_UPDATED.message,
				userResponse
			);

			return res.status(successCode.USER_UPDATED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async deleteUserByEmail(req, res, next) {
		try {
			const user = await this.userService.getUserByEmail(req.params.email);

			await this.userService.deleteUserByEmail(req.params.email);
			const response = APIResponse.success(
				successCode.USER_DELETED.code,
				successCode.USER_DELETED.message,
				null
			);
			return res.status(successCode.USER_DELETED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
