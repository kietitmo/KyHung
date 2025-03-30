import UserRepository from '../../data-access/repositories/userRepository.js';
import Pagination from '../dto/pagination.js';
import UserDTO from '../dto/userDTO.js';
import { errorCode } from '../../utils/userResponseCode.js';
import CustomError from '../dto/customError.js';

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async getUsers(getUserRequest) {
		const offset = (getUserRequest.page - 1) * getUserRequest.limit;

		const users = await this.userRepository.findAllWithFilterAndPagination(
			getUserRequest.filter,
			getUserRequest.limit,
			offset
		);
		const total = users.length;
		const totalPages = Math.ceil(total / getUserRequest.limit);
		const userResponse = users.map((user) => UserDTO.fromEntity(user));
		return new Pagination(
			userResponse,
			getUserRequest.page,
			getUserRequest.limit,
			total,
			totalPages,
			getUserRequest.filter
		);
	}

	async getUserByEmail(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_FOUND);
		}
		return user;
	}

	async createUser(userData) {
		const user = await this.userRepository.findOne({ email: userData.email });
		if (user) {
			throw new CustomError(errorCode.USER_ALREADY_EXISTS);
		}
		return this.userRepository.create(userData);
	}

	async updateUserByEmail({ email }, userData) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_FOUND);
		}
		return this.userRepository.updateByEmail({ email }, userData);
	}

	async deleteUserByEmail(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_FOUND);
		}
		return this.userRepository.delete({ email });
	}
}

export default UserService;
