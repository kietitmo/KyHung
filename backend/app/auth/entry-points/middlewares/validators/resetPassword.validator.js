import { validateObjectWithSchema } from '../../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../common/constants/authResponseCode.js';
import env from '../../../../common/config/env.js';

const resetPasswordSchema = {
	token: {
		type: 'string',
		regex: env.TOKEN_REGEXP,
		errorCode: errorCode.USER_TOKEN_INVALID,
	},
	newPassword: {
		type: 'string',
		regex: env.PASSWORD_REGEXP,
		errorCode: errorCode.USER_PASSWORD_INVALID,
	},
};

export const resetPasswordValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, resetPasswordSchema, {
			required: ['token', 'newPassword'],
		});
		next();
	} catch (error) {
		next(error);
	}
};

export default resetPasswordValidator;
