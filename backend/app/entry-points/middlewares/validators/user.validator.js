import CustomError from '../../../domain/custom/customError.js';
import { errorCode } from '../../../utils/code/userResponseCode.js';
import env from '../../../config/env.js';

const validateCreateUser = (req, res, next) => {
	const { fullName, email, password } = req.body;

	if (
		!fullName ||
		typeof fullName !== 'string' ||
		fullName.trim().length === 0 ||
		!env.FULL_NAME_REGEXP.test(fullName)
	) {
		throw new CustomError(errorCode.USER_FULL_NAME_INVALID);
	}

	if (!email || !env.EMAIL_REGEXP.test(email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}

	if (
		!password ||
		password.length < env.PASSWORD_MIN_LENGTH ||
		!env.PASSWORD_REGEXP.test(password)
	) {
		throw new CustomError(errorCode.USER_PASSWORD_INVALID);
	}

	next();
};

const validateUpdateUser = (req, res, next) => {
	const { fullName, email, password } = req.body;

	if (req.params.email && !env.EMAIL_REGEXP.test(req.params.email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}

	if (
		fullName &&
		(typeof fullName !== 'string' ||
			fullName.trim().length === 0 ||
			!env.FULL_NAME_REGEXP.test(fullName))
	) {
		throw new CustomError(errorCode.USER_FULL_NAME_INVALID);
	}

	if (email && !env.EMAIL_REGEXP.test(email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}

	if (password) {
		if (password.length < env.PASSWORD_MIN_LENGTH) {
			throw new CustomError(errorCode.USER_PASSWORD_INVALID);
		}
		if (!env.PASSWORD_REGEXP.test(password)) {
			throw new CustomError(errorCode.USER_PASSWORD_INVALID);
		}
	}

	next();
};

const validateDeleteUser = (req, res, next) => {
	if (req.params.email && !env.EMAIL_REGEXP.test(req.params.email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}

	next();
};

const validateGetOneUser = (req, res, next) => {
	if (req.params.email && !env.EMAIL_REGEXP.test(req.params.email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}

	next();
};

const validateGetUser = (req, res, next) => {
	const { filter, limit, page } = req.query;

	// Validate filter if provided
	if (filter) {
		try {
			const parsedFilter =
				typeof filter === 'string' ? JSON.parse(filter) : filter;

			// Validate filter structure
			if (typeof parsedFilter !== 'object' || parsedFilter === null) {
				throw new CustomError(errorCode.USER_BAD_REQUEST);
			}

			// Validate specific filter fields if they exist
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

				// Validate date range operators
				const validOperators = ['$gt', '$gte', '$lt', '$lte', '$eq'];
				const operators = Object.keys(parsedFilter.createdAt);

				for (const op of operators) {
					if (!validOperators.includes(op)) {
						throw new CustomError(errorCode.USER_BAD_REQUEST);
					}
					// Validate date format
					const date = new Date(parsedFilter.createdAt[op]);
					if (isNaN(date.getTime())) {
						throw new CustomError(errorCode.USER_BAD_REQUEST);
					}
				}
			}
		} catch (error) {
			if (error instanceof CustomError) {
				throw error;
			}
			throw new CustomError(errorCode.USER_BAD_REQUEST);
		}
	}

	// Validate limit
	if (limit) {
		const parsedLimit = parseInt(limit);
		if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
			throw new CustomError(errorCode.USER_BAD_REQUEST);
		}
	}

	// Validate page
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
