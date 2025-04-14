import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../common/constants/userResponseCode.js';
import env from '../../../common/config/env.js';

const blockUserSchema = {
	email: {
		type: 'string',
		regex: env.EMAIL_REGEXP,
		errorCode: errorCode.USER_EMAIL_INVALID,
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

const blockUserPermissions = {
	admin: ['email', 'isBlocked', 'blockedReason'],
	user: [],
};

export const blockUserValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, blockUserSchema, {
			allowedFieldsByRole: blockUserPermissions,
			required: ['email', 'isBlocked', 'blockedReason'],
			role: req.user?.role || 'admin',
		});
		next();
	} catch (error) {
		next(error);
	}
};
