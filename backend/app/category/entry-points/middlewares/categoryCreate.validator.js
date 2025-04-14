import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../category/common/constants/categoryResponseCode.js';

const createCategorySchema = {
	name: {
		type: 'string',
		trim: true,
		errorCode: errorCode.CATEGORY_NAME_INVALID,
	},
	description: {
		type: 'string',
		errorCode: errorCode.CATEGORY_DESCRIPTION_INVALID,
	},
};

const createCategoryPermissions = {
	admin: ['name', 'description'],
};

export const createCategoryValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, createCategorySchema, {
			allowedFieldsByRole: createCategoryPermissions,
			required: ['name', 'description'],
			role: req.user?.role || 'admin',
		});
		next();
	} catch (error) {
		next(error);
	}
};

export default createCategoryValidator;
