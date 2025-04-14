import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../common/constants/userResponseCode.js';
import env from '../../../common/config/env.js';

const createUserSchema = {
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
	role: {
		type: 'enum',
		values: ['user', 'admin'],
		errorCode: errorCode.USER_ROLE_INVALID,
	},
	isVerified: {
		type: 'boolean',
		errorCode: errorCode.USER_VERIFIED_INVALID,
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
	isBlocked: {
		type: 'boolean',
		errorCode: errorCode.USER_IS_BLOCKED_INVALID,
	},
	blockedReason: {
		type: 'string',
		trim: true,
		errorCode: errorCode.USER_BLOCKED_REASON_INVALID,
	},
};

const createUserPermissions = {
	admin: [
		'fullName',
		'email',
		'password',
		'role',
		'isVerified',
		'phoneNumber',
		'address',
		'city',
		'gender',
		'country',
		'isBlocked',
		'blockedReason',
	],
	user: [
		'email',
		'fullName',
		'password',
		'phoneNumber',
		'address',
		'city',
		'gender',
		'country',
	],
};

export const createUserValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, createUserSchema, {
			allowedFieldsByRole: createUserPermissions,
			required: [],
			role: req.user?.role || 'user',
		});
		next();
	} catch (error) {
		next(error);
	}
};
