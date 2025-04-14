import UserRepository from '../../data-access/user.repository.js';
import { errorCode } from '../../../user/common/constants/userResponseCode.js';
import CustomError from '../../../common/custom/error/customError.js';

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
		this.searchFields = [
			'fullName',
			'email',
			'phoneNumber',
			'address',
			'city',
			'country',
		];
	}

	async countUsers(condition) {
		return await this.userRepository.countDocuments(condition);
	}

	async getUsers(getAllRequest) {
		const offset = (getAllRequest.page - 1) * getAllRequest.limit;

		const users = await this.userRepository.findAllWithFilterAndPagination(
			getAllRequest.filter,
			getAllRequest.limit,
			offset,
			this.searchFields,
			getAllRequest.sort
		);

		return users;
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

	async blockUser(email, reason) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_FOUND);
		}

		if (user.isBlocked) {
			throw new CustomError(errorCode.USER_ALREADY_BLOCKED);
		}

		const blockedAt = new Date();
		await this.userRepository.update(
			{ email },
			{
				isBlocked: true,
				blockedReason: reason,
				blockedAt,
			}
		);

		return user;
	}

	async unblockUser(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_FOUND);
		}

		if (!user.isBlocked) {
			throw new CustomError(errorCode.USER_NOT_BLOCKED);
		}

		await this.userRepository.update(
			{ email },
			{
				isBlocked: false,
				blockedReason: null,
				blockedAt: null,
			}
		);

		return user;
	}

	async getBlockedUsers() {
		return this.userRepository.findMany({ isBlocked: true });
	}
}

export default UserService;
