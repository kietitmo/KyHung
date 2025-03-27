// services/userService.js
import UserRepository from '../../data-access/repositories/userRepository';
import Pagination from '../dto/pagination';
import { ERROR_CODES } from '../utils/errorCodes.js'; // Import ERROR_CODES
import CustomError from '../utils/customError.js';

class UserService {
	static getUsers = async (page = 1, limit = 100) => {
		const offset = (page - 1) * limit;

		const users = await UserRepository.findAll(limit, offset);
		const total = await UserRepository.count();
		const totalPages = Math.ceil(total / limit);

		return Pagination(users, page, limit, total, totalPages);
	};

	static getUserByEmail = async (email) => {
		const user = await UserRepository.findByEmail(email);
		if (!user) {
			throw new CustomError(ERROR_CODES.USER_NOT_FOUND);
		}
		return user;
	};

	static createUser = async (userData) => {
		return UserRepository.create(userData);
	};

	static updateUserByEmail = async (email, userData) => {
		const user = await UserRepository.findByEmail(email);
		if (!user) {
			throw new CustomError(ERROR_CODES.USER_NOT_FOUND);
		}
		return UserRepository.updateByEmail(email, userData);
	};

	static deleteUserByEmail = async (email) => {
		const user = await UserRepository.findByEmail(email);
		if (!user) {
			throw new CustomError(ERROR_CODES.USER_NOT_FOUND);
		}
		return UserRepository.deleteByEmail(email);
	};
}

export default UserService;
