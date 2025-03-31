import CustomError from '../../../domain/custom/customError.js';
import { errorCode } from '../../../utils/userResponseCode.js';
import Constants from '../../../utils/constant.js';

const validateLogin = (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !Constants.EMAIL_REGEXP.test(email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}

	if (
		!password ||
		password.length < Constants.PASSWORD_MIN_LENGTH ||
		!Constants.PASSWORD_REGEXP.test(password)
	) {
		throw new CustomError(errorCode.USER_PASSWORD_INVALID);
	}

	next();
};

export { validateLogin };
