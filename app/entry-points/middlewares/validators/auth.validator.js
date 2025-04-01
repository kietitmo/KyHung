import CustomError from '../../../domain/custom/customError.js';
import { errorCode } from '../../../utils/userResponseCode.js';
import Config from '../../../config/config.js';

const validateLogin = (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !Config.EMAIL_REGEXP.test(email)) {
		throw new CustomError(errorCode.USER_EMAIL_INVALID);
	}

	if (
		!password ||
		password.length < Config.PASSWORD_MIN_LENGTH ||
		!Config.PASSWORD_REGEXP.test(password)
	) {
		throw new CustomError(errorCode.USER_PASSWORD_INVALID);
	}

	next();
};

export { validateLogin };
