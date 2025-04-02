import CustomError from '../../../domain/custom/customError.js';
import { errorCode } from '../../../utils/code/productResponseCode.js';
import Config from '../../../config/config.js';

const validateCreateProduct = (req, res, next) => {
	const { name, price, imageUrl, videoUrl } = req.body;

	if (!name || typeof name !== 'string' || name.trim().length === 0) {
		throw new CustomError(errorCode.PRODUCT_FULL_NAME_INVALID);
	}

	if (typeof price === 'string') {
		throw new CustomError(errorCode.PRODUCT_PRICE_INVALID);
	}

	if (imageUrl && !Config.URL_REGEXP.test(imageUrl)) {
		throw new CustomError(errorCode.PRODUCT_IMAGE_URL_INVALID);
	}

	if (videoUrl && !Config.URL_REGEXP.test(videoUrl)) {
		throw new CustomError(errorCode.PRODUCT_VIDEO_URL_INVALID);
	}

	next();
};

const validateUpdateProduct = (req, res, next) => {
	const { name, price, imageUrl, videoUrl } = req.body;
	const productId = req.params.id;

	if (!productId) {
		throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
	}

	if (!name || typeof name !== 'string' || name.trim().length === 0) {
		throw new CustomError(errorCode.PRODUCT_FULL_NAME_INVALID);
	}

	if (typeof price === 'string') {
		throw new CustomError(errorCode.PRODUCT_PRICE_INVALID);
	}

	if (imageUrl && !Config.URL_REGEXP.test(imageUrl)) {
		throw new CustomError(errorCode.PRODUCT_IMAGE_URL_INVALID);
	}

	if (videoUrl && !Config.URL_REGEXP.test(videoUrl)) {
		throw new CustomError(errorCode.PRODUCT_VIDEO_URL_INVALID);
	}

	next();
};

const validateGetProduct = (req, res, next) => {
	const { filter, limit, page } = req.body;
	if (filter && typeof filter !== 'object') {
		throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
	}
	if (limit && (typeof limit !== 'number' || limit < 1)) {
		throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
	}
	if (page && (typeof page !== 'number' || page < 1)) {
		throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
	}

	next();
};

export { validateCreateProduct, validateUpdateProduct, validateGetProduct };
