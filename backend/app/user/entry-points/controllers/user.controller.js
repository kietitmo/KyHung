import UserService from '../../../user/domain/services/user.service.js';
import APIResponse from '../../../common/custom/apiResponse.js';
import RequestUserDTO from '../../dto/request/requestUserDTO.js';
import { successCode } from '../../common/constants/userResponseCode.js';
import UserDTO from '../../dto/response/userDTO.js';

class UserController {
	constructor() {
		this.userService = new UserService();
	}

	async getUserByEmail(req, res, next) {
		try {
			const user = await this.userService.getUserByEmail(req.params.email);

			const userResponse = UserDTO.fromEntity(user);
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

			const userResponse = UserDTO.fromEntity(user);
			const response = APIResponse.success(
				successCode.USER_UPDATED.message,
				userResponse
			);

			return res.status(successCode.USER_UPDATED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
