import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../favorite/common/constants/favoriteResponseCode.js';

const updateFavoriteSchema = {
	email: {
		type: 'string',
		trim: true,
		errorCode: errorCode.PRODUCT_NAME_INVALID,
	},
	productId: {
		type: 'string',
		errorCode: errorCode.PRODUCT_CATEGORY_INVALID,
	},
	quantity: {
		type: 'number',
		min: 0,
		errorCode: errorCode.PRODUCT_PRICE_INVALID,
	},
	note: {
		type: 'string',
		trim: true,
		errorCode: errorCode.PRODUCT_DESCRIPTION_INVALID,
	},
};

const updateFavoritePermissions = {
	admin: ['email', 'productId', 'quantity', 'note'],
	user: ['productId', 'quantity', 'note'],
};

export const updateFavoriteValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, updateFavoriteSchema, {
			allowedFieldsByRole: updateFavoritePermissions,
			required: [],
			role: req.user?.role || 'user',
		});
		next();
	} catch (error) {
		next(error);
	}
};

export default updateFavoriteValidator;
