import CustomError from '../../../domain/custom/customError.js';
import { errorCode } from '../../../utils/code/userResponseCode.js';
import env from '../../../config/env.js';

const validateLogin = (req, res, next) => {
	const { email, password } = req.body;

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

const validateRegister = (req, res, next) => {
	const { email, password, fullName } = req.body;

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

	if (!fullName || !env.FULL_NAME_REGEXP.test(fullName)) {
		throw new CustomError(errorCode.USER_FULL_NAME_INVALID);
	}

	next();
};

const validateResetPassword = (req, res, next) => {
	const { token, newPassword } = req.body;

	if (!token) {
		throw new CustomError(errorCode.PASSWORD_RESET_TOKEN_INVALID);
	}

	if (
		!newPassword ||
		newPassword.length < env.PASSWORD_MIN_LENGTH ||
		!env.PASSWORD_REGEXP.test(newPassword)
	) {
		throw new CustomError(errorCode.USER_PASSWORD_INVALID);
	}

	next();
};

export { validateLogin, validateRegister, validateResetPassword };
