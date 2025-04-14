import { validateObjectWithSchema } from '../../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../../auth/common/constants/authResponseCode.js';
import env from '../../../../common/config/env.js';

const registerSchema = {
	fullName: {
		type: 'string',
		trim: true,
		regex: env.FULL_NAME_REGEXP,
		errorCode: errorCode.USER_FULL_NAME_INVALID,
	},
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
	phoneNumber: {
		type: 'string',
		regex: env.PHONE_NUMBER_REGEXP,
		errorCode: errorCode.USER_PHONE_NUMBER_INVALID,
	},
	address: {
		type: 'string',
		trim: true,
		errorCode: errorCode.USER_ADDRESS_INVALID,
	},
	city: {
		type: 'string',
		trim: true,
		errorCode: errorCode.USER_CITY_INVALID,
	},
	gender: {
		type: 'string',
		trim: true,
		errorCode: errorCode.USER_GENDER_INVALID,
	},
	country: {
		type: 'string',
		trim: true,
		errorCode: errorCode.USER_COUNTRY_INVALID,
	},
};

export const registerValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, registerSchema, {
			required: [],
		});
		next();
	} catch (error) {
		next(error);
	}
};

export default registerValidator;
