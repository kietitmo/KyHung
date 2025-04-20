import {
	validateRequest,
	validateObjectId,
	validateEmail,
} from '../../../common/utils/validation.helper.js';
import { validateGetAll } from '../../../common/middlewares/common.validator.js';
import {
	createFavoriteSchema,
	updateFavoriteSchema,
} from './favorite.schema.validation.js';

export const validateGetAllFavorite = validateGetAll;

export const validateCreateFavorite = validateRequest(
	createFavoriteSchema,
	'body'
);

export const validateUpdateFavorite = validateRequest(
	updateFavoriteSchema,
	'body'
);

export const validateFavoriteByEmail = validateEmail('email');

export const validateFavoriteById = validateObjectId('id');
