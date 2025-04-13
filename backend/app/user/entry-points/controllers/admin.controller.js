import UserService from '../../../user/domain/services/user.service.js';
import APIResponse from '../../../common/custom/apiResponse.js';
import RequestUserDTO from '../../dto/request/requestUserDTO.js';
import GetAllRequestDTO from '../../../common/dto/getAllRequestDTO.js';
import { successCode } from '../../common/constants/userResponseCode.js';
import AdminUserDTO from '../../dto/response/adminUserDTO.js';
import Pagination from '../../../common/custom/pagination.js';
class AdminController {
	constructor() {
		this.userService = new UserService();
	}
	async createUser(req, res, next) {
		try {
			const userRequest = RequestUserDTO.fromRequest(req.body);
			const user = await this.userService.createUser(userRequest);
			const userResponse = AdminUserDTO.fromEntity(user);
			const response = APIResponse.success(
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
			const getUserRequest = GetAllRequestDTO.fromRequest(req);
			const users = await this.userService.getUsers(getUserRequest);

			const total = await this.userService.countUsers();
			const totalPages = Math.ceil(total / getUserRequest.limit);
			const usersDTO = users.map((user) => AdminUserDTO.fromEntity(user));

			const userResponse = new Pagination(
				usersDTO,
				getUserRequest.page,
				getUserRequest.limit,
				total,
				totalPages,
				getUserRequest.filter,
				getUserRequest.sort
			);

			const response = APIResponse.success(
				successCode.USERS_GET_ALL.message,
				userResponse
			);

			res.status(successCode.USERS_GET_ALL.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async getUserByEmail(req, res, next) {
		try {
			const user = await this.userService.getUserByEmail(req.params.email);

			const userResponse = AdminUserDTO.fromEntity(user);
			const response = APIResponse.success(
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
			const updateUser = RequestUserDTO.fromRequest(req.body);
			const user = await this.userService.updateUserByEmail(
				req.params.email,
				updateUser
			);

			const userResponse = AdminUserDTO.fromEntity(user);
			const response = APIResponse.success(
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
			const response = APIResponse.success(successCode.USER_DELETED.message, null);
			return res.status(successCode.USER_DELETED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default AdminController;
