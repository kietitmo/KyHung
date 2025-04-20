import {
	validateRequest,
	validateObjectId,
} from '../../../common/utils/validation.helper.js';
import { validateGetAll } from '../../../common/middlewares/common.validator.js';
import {
	createProductSchema,
	updateProductSchema,
} from './product.schema.validation.js';

export const validateGetAllProduct = validateGetAll;

export const validateCreateProduct = validateRequest(
	createProductSchema,
	'body'
);

export const validateUpdateProduct = validateRequest(
	updateProductSchema,
	'body'
);

export const validateGetProductById = validateObjectId('id');

export const validateDeleteProductById = validateObjectId('id');
