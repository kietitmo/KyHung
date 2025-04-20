import {
	validateRequest,
	validateObjectId,
} from '../../../common/utils/validation.helper.js';
import { validateGetAll } from '../../../common/middlewares/common.validator.js';
import {
	createCategorySchema,
	updateCategorySchema,
} from './category.schema.validation.js';

export const validateGetAllCategory = validateGetAll;

export const validateCreateCategory = validateRequest(
	createCategorySchema,
	'body'
);

export const validateUpdateCategory = validateRequest(
	updateCategorySchema,
	'body'
);

export const validateGetCategoryById = validateObjectId('id');

export const validateDeleteCategoryById = validateObjectId('id');
