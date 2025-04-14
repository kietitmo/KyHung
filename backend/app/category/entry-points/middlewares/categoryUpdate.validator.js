import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../category/common/constants/categoryResponseCode.js';

const updateCategorySchema = {
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

const updateCategoryPermissions = {
	admin: ['name', 'description'],
};

export const updateCategoryValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, updateCategorySchema, {
			allowedFieldsByRole: updateCategoryPermissions,
			required: [],
			role: req.user?.role || 'admin',
		});
		next();
	} catch (error) {
		next(error);
	}
};

export default updateCategoryValidator;
