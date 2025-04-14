import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../product/common/constants/productResponseCode.js';

const getCategorySchema = {
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

export const getProductValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.query, getProductSchema);
		next();
	} catch (error) {
		next(error);
	}
};

export default getProductValidator;
