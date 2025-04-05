import UserRepository from '../../data-access/repositories/userRepository.js';
import Pagination from '../custom/pagination.js';
import UserDTO from '../dto/user/userDTO.js';
import { errorCode } from '../../utils/code/userResponseCode.js';
import CustomError from '../custom/customError.js';

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async getUsers(getAllRequest) {
		const offset = (getAllRequest.page - 1) * getAllRequest.limit;

		const users = await this.userRepository.findAllWithFilterAndPagination(
			getAllRequest.filter,
			getAllRequest.limit,
			offset,
			['favoriteProducts']
		);

		const total = users.length;
		const totalPages = Math.ceil(total / getAllRequest.limit);
		const userResponse = users.map((user) => UserDTO.fromEntity(user));
		return new Pagination(
			userResponse,
			getAllRequest.page,
			getAllRequest.limit,
			total,
			totalPages,
			getAllRequest.filter
		);
	}

	async getUserByEmail(email) {
		const user = await this.userRepository.findOne({ email }, [
			'favoriteProducts',
		]);
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
		return this.userRepository.create({
			...userData,
			isVerified: true,
		});
	}

	async updateUserByEmail(email, userData) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_FOUND);
		}
		return this.userRepository.update({ email }, userData);
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
