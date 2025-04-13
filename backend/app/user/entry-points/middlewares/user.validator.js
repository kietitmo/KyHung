import CustomError from '../../../common/custom/error/customError.js';
import { errorCode } from '../../common/constants/userResponseCode.js';
import env from '../../../common/config/env.js';

// 1️⃣ Field Validators
const fieldValidators = {
	fullName: (value) => {
		if (
			typeof value !== 'string' ||
			value.trim().length === 0 ||
			!env.FULL_NAME_REGEXP.test(value)
		) {
			throw new CustomError(errorCode.USER_FULL_NAME_INVALID);
		}
	},
	email: (value) => {
		if (!env.EMAIL_REGEXP.test(value)) {
			throw new CustomError(errorCode.USER_EMAIL_INVALID);
		}
	},
	password: (value) => {
		if (
			value.length < env.PASSWORD_MIN_LENGTH ||
			!env.PASSWORD_REGEXP.test(value)
		) {
			throw new CustomError(errorCode.USER_PASSWORD_INVALID);
		}
	},
	role: (value) => {
		if (!['user', 'admin'].includes(value)) {
			throw new CustomError(errorCode.USER_ROLE_INVALID);
		}
	},
	isVerified: (value) => {
		if (typeof value !== 'boolean') {
			throw new CustomError(errorCode.USER_VERIFIED_INVALID);
		}
	},
};

// 2️⃣ Field Permissions by Role
const createFieldPermissions = {
	admin: ['fullName', 'email', 'password', 'role', 'isVerified'],
	user: ['fullName', 'email', 'password'], // nếu user tự đăng ký
};

const updateFieldPermissions = {
	admin: ['fullName', 'email', 'password', 'role', 'isVerified'],
	user: ['fullName', 'password'],
};

// 3️⃣ Create User
const validateCreateUser = (req, res, next) => {
	const userRole = req.user?.role || 'user';
	const allowedFields = createFieldPermissions[userRole] || [];
	const bodyFields = Object.keys(req.body);

	for (const field of bodyFields) {
		if (!allowedFields.includes(field)) {
			throw new CustomError(errorCode.USER_UNAUTHORIZED_FIELD_UPDATE);
		}
		if (fieldValidators[field]) {
			fieldValidators[field](req.body[field]);
		}
	}

	// Bắt buộc phải có các field tối thiểu
	if (!req.body.fullName || !req.body.email || !req.body.password) {
		throw new CustomError(errorCode.USER_REQUIRED_FIELDS_MISSING);
	}

	next();
};

// 4️⃣ Update User
const validateUpdateUser = (req, res, next) => {
	const userRole = req.user?.role;
	if (!userRole) {
		throw new CustomError(errorCode.USER_UNAUTHORIZED);
	}

	const allowedFields = updateFieldPermissions[userRole] || [];
	const bodyFields = Object.keys(req.body);

	for (const field of bodyFields) {
		if (!allowedFields.includes(field)) {
			throw new CustomError(errorCode.USER_UNAUTHORIZED_FIELD_UPDATE);
		}
		if (fieldValidators[field]) {
			fieldValidators[field](req.body[field]);
		}
	}

	next();
};

// 5️⃣ Delete User
const validateDeleteUser = (req, res, next) => {
	const { email } = req.params;
	if (email && !env.EMAIL_REGEXP.test(email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}
	next();
};

// 6️⃣ Get One User
const validateGetOneUser = (req, res, next) => {
	const { email } = req.params;
	if (email && !env.EMAIL_REGEXP.test(email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}
	next();
};

// 7️⃣ Get Users (list)
const validateGetUser = (req, res, next) => {
	const { filter, limit, page } = req.query;

	if (filter) {
		try {
			const parsedFilter =
				typeof filter === 'string' ? JSON.parse(filter) : filter;

			if (typeof parsedFilter !== 'object' || parsedFilter === null) {
				throw new CustomError(errorCode.USER_BAD_REQUEST);
			}

			if (parsedFilter.email && typeof parsedFilter.email !== 'string') {
				throw new CustomError(errorCode.USER_BAD_REQUEST);
			}
			if (parsedFilter.fullName && typeof parsedFilter.fullName !== 'string') {
				throw new CustomError(errorCode.USER_BAD_REQUEST);
			}
			if (parsedFilter.role && !['user', 'admin'].includes(parsedFilter.role)) {
				throw new CustomError(errorCode.USER_BAD_REQUEST);
			}
			if (
				parsedFilter.isVerified !== undefined &&
				typeof parsedFilter.isVerified !== 'boolean'
			) {
				throw new CustomError(errorCode.USER_BAD_REQUEST);
			}
			if (parsedFilter.createdAt) {
				if (
					typeof parsedFilter.createdAt !== 'object' ||
					parsedFilter.createdAt === null
				) {
					throw new CustomError(errorCode.USER_BAD_REQUEST);
				}

				const validOperators = ['$gt', '$gte', '$lt', '$lte', '$eq'];
				for (const op of Object.keys(parsedFilter.createdAt)) {
					if (!validOperators.includes(op)) {
						throw new CustomError(errorCode.USER_BAD_REQUEST);
					}
					const date = new Date(parsedFilter.createdAt[op]);
					if (isNaN(date.getTime())) {
						throw new CustomError(errorCode.USER_BAD_REQUEST);
					}
				}
			}
		} catch (err) {
			throw new CustomError(errorCode.USER_BAD_REQUEST);
		}
	}

	if (limit) {
		const parsedLimit = parseInt(limit);
		if (isNaN(parsedLimit) || parsedLimit < 1) {
			throw new CustomError(errorCode.USER_BAD_REQUEST);
		}
	}

	if (page) {
		const parsedPage = parseInt(page);
		if (isNaN(parsedPage) || parsedPage < 1) {
			throw new CustomError(errorCode.USER_BAD_REQUEST);
		}
	}

	next();
};

export {
	validateCreateUser,
	validateUpdateUser,
	validateDeleteUser,
	validateGetUser,
	validateGetOneUser,
};
