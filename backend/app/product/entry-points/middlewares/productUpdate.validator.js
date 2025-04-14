import { validateObjectWithSchema } from '../../../common/utils/validatorBySchema.js';
import { errorCode } from '../../../product/common/constants/productResponseCode.js';

const updateProductSchema = {
	name: {
		type: 'string',
		trim: true,
		errorCode: errorCode.PRODUCT_NAME_INVALID,
	},
	category: {
		type: 'string',
		errorCode: errorCode.PRODUCT_CATEGORY_INVALID,
	},
	price: {
		type: 'number',
		min: 0,
		errorCode: errorCode.PRODUCT_PRICE_INVALID,
	},
	description: {
		type: 'string',
		trim: true,
		errorCode: errorCode.PRODUCT_DESCRIPTION_INVALID,
	},
	imageUrl: {
		type: 'string',
		trim: true,
		errorCode: errorCode.PRODUCT_IMAGE_URL_INVALID,
	},
	videoUrl: {
		type: 'string',
		trim: true,
		errorCode: errorCode.PRODUCT_VIDEO_URL_INVALID,
	},
};

const updateProductPermissions = {
	admin: ['name', 'category', 'price', 'description', 'imageUrl', 'videoUrl'],
};

export const updateProductValidator = (req, res, next) => {
	try {
		validateObjectWithSchema(req.body, updateProductSchema, {
			allowedFieldsByRole: updateProductPermissions,
			required: [],
			role: req.user?.role || 'admin',
		});
		next();
	} catch (error) {
		next(error);
	}
};

export default updateProductValidator;
