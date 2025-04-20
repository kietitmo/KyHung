import {
	validateRequest,
	validateEmail,
	validateObjectId,
} from '../../../common/utils/validation.helper.js';
import { validateGetAll } from '../../../common/middlewares/common.validator.js';
import {
	createUserSchema,
	updateUserSchema,
} from './user.schema.validation.js';

export const validateGetAllUser = validateGetAll;

export const validateCreateUser = validateRequest(createUserSchema, 'body');

export const validateUpdateUser = validateRequest(updateUserSchema, 'body');

export const validateUserEmail = validateEmail('email');

export const validateUserId = validateObjectId('id');
