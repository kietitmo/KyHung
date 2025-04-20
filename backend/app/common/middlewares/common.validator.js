import { validateRequest } from '../utils/validation.helper.js';
import Joi from 'joi';
const getAllSchema = {
	user: Joi.object({
		page: Joi.number(),
		limit: Joi.number(),
		filter: Joi.string(),
		sort: Joi.string(),
	}),
	admin: Joi.object({
		page: Joi.number(),
		limit: Joi.number(),
		filter: Joi.string(),
		sort: Joi.string(),
	}),
};

export const validateGetAll = validateRequest(getAllSchema, 'query');
