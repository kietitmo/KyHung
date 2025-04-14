import { validateObjectWithSchema } from '../../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../common/constants/authResponseCode.js';
import env from '../../../../common/config/env.js';

const loginSchema = {
	email: {
		type: 'string',
		regex: env.EMAIL_REGEXP,
		errorCode: errorCode.USER_EMAIL_INVALID,
	},
	password: {
		type: 'string',
		regex: env.PASSWORD_REGEXP,
		errorCode: errorCode.USER_PASSWORD_INVALID,
	},
};

export const loginValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, loginSchema, {
			required: ['email', 'password'],
		});
		next();
	} catch (error) {
		next(error);
	}
};

export default loginValidator;
