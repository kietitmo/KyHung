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
	const { filter, limit, page } = req.body;
	if (filter && typeof filter !== 'object') {
		throw new CustomError(errorCode.USER_BAD_REQUEST);
	}
	if (limit && (typeof limit !== 'number' || limit < 1)) {
		throw new CustomError(errorCode.USER_BAD_REQUEST);
	}
	if (page && (typeof page !== 'number' || page < 1)) {
		throw new CustomError(errorCode.USER_BAD_REQUEST);
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
