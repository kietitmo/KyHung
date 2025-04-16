import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../favorite/common/constants/favoriteResponseCode.js';

const getFavoriteSchema = {
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

export const getFavoriteValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.query, getFavoriteSchema);
		next();
	} catch (error) {
		next(error);
	}
};

export default getFavoriteValidator;
