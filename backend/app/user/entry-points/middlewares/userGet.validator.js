import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../common/constants/userResponseCode.js';

const getUserSchema = {
	page: {
		type: 'string',
		forceType: 'number',
		errorCode: errorCode.PAGE_INVALID,
	},
	limit: {
		type: 'string',
		forceType: 'number',
		errorCode: errorCode.LIMIT_INVALID,
	},
	sort: {
		type: 'string',
		errorCode: errorCode.SORT_INVALID,
	},
	filter: {
		type: 'string',
		errorCode: errorCode.FILTER_INVALID,
	},
};

const getUserPermissions = {
	admin: ['page', 'limit', 'sort', 'filter'],
	user: ['page', 'limit', 'sort', 'filter'],
};

export const getUserValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.query, getUserSchema, {
			allowedFieldsByRole: getUserPermissions,
			required: [],
			role: req.user?.role || 'user',
		});
		next();
	} catch (error) {
		next(error);
	}
};
