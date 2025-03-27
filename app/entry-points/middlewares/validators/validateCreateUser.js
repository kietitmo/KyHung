// middleware/validateCreateUser.js
import CustomError from '../../../domain/dto/customError.js';
import { errorCode } from '../../utils/responseCode.js';

const validateCreateUser = (req, res, next) => {
	const { name, email, password } = req.body;
	const errors = [];

	if (!name) errors.push('Name is required');
	if (!email) errors.push('Email is required');
	if (!password) errors.push('Password is required');

	if (errors.length > 0) {
		throw new CustomError(errorCode.USER_BAD_REQUEST, errors.join(', '));
	}

	next();
};

export default validateCreateUser;
