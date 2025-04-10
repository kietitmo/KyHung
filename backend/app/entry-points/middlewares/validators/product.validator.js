import CustomError from '../../../domain/custom/customError.js';
import { errorCode } from '../../../utils/code/productResponseCode.js';
import env from '../../../config/env.js';

const validateCreateProduct = (req, res, next) => {
	const { name, price, imageUrl, videoUrl } = req.body;

	if (!name || typeof name !== 'string' || name.trim().length === 0) {
		throw new CustomError(errorCode.PRODUCT_FULL_NAME_INVALID);
	}

	if (typeof price === 'string') {
		throw new CustomError(errorCode.PRODUCT_PRICE_INVALID);
	}

	if (imageUrl && !env.URL_REGEXP.test(imageUrl)) {
		throw new CustomError(errorCode.PRODUCT_IMAGE_URL_INVALID);
	}

	if (videoUrl && !env.URL_REGEXP.test(videoUrl)) {
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

	if (imageUrl && !env.URL_REGEXP.test(imageUrl)) {
		throw new CustomError(errorCode.PRODUCT_IMAGE_URL_INVALID);
	}

	if (videoUrl && !env.URL_REGEXP.test(videoUrl)) {
		throw new CustomError(errorCode.PRODUCT_VIDEO_URL_INVALID);
	}

	next();
};

const validateGetProduct = (req, res, next) => {
	const { filter, limit, page } = req.query;

	// Validate filter if provided
	if (filter) {
		try {
			const parsedFilter =
				typeof filter === 'string' ? JSON.parse(filter) : filter;

			// Validate filter structure
			if (typeof parsedFilter !== 'object' || parsedFilter === null) {
				throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
			}

			// Validate specific filter fields if they exist
			if (parsedFilter.category && typeof parsedFilter.category !== 'string') {
				throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
			}

			if (parsedFilter.price) {
				if (typeof parsedFilter.price !== 'object' || parsedFilter.price === null) {
					throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
				}

				// Validate price range operators
				const validOperators = ['$gt', '$gte', '$lt', '$lte', '$eq'];
				const operators = Object.keys(parsedFilter.price);

				for (const op of operators) {
					if (!validOperators.includes(op)) {
						throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
					}
					if (typeof parsedFilter.price[op] !== 'number') {
						throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
					}
				}
			}

			if (parsedFilter.name && typeof parsedFilter.name !== 'string') {
				throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
			}
		} catch (error) {
			if (error instanceof CustomError) {
				throw error;
			}
			throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
		}
	}

	// Validate limit
	if (limit) {
		const parsedLimit = parseInt(limit);
		if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
			throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
		}
	}

	// Validate page
	if (page) {
		const parsedPage = parseInt(page);
		if (isNaN(parsedPage) || parsedPage < 1) {
			throw new CustomError(errorCode.PRODUCT_BAD_REQUEST);
		}
	}

	next();
};

export { validateCreateProduct, validateUpdateProduct, validateGetProduct };
