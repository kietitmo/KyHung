import Joi from 'joi';

/**
 * Schema for creating a new product
 */
export const createCategorySchema = {
	admin: Joi.object({
		name: Joi.string().required().min(3).max(100).trim().messages({
			'string.empty': 'Product name is required',
			'string.min': 'Product name must be at least 3 characters long',
			'string.max': 'Product name cannot exceed 100 characters',
			'any.required': 'Product name is required',
		}),

		description: Joi.string().required().min(10).max(1000).trim().messages({
			'string.empty': 'Product description is required',
			'string.min': 'Product description must be at least 10 characters long',
			'string.max': 'Product description cannot exceed 1000 characters',
			'any.required': 'Product description is required',
		}),
	}),
};

/**
 * Schema for updating a product
 */
export const updateCategorySchema = {
	admin: Joi.object({
		name: Joi.string().min(3).max(100).trim().messages({
			'string.min': 'Product name must be at least 3 characters long',
			'string.max': 'Product name cannot exceed 100 characters',
		}),

		description: Joi.string().min(10).max(1000).trim().messages({
			'string.min': 'Product description must be at least 10 characters long',
			'string.max': 'Product description cannot exceed 1000 characters',
		}),
	})
		.min(1)
		.messages({
			'object.min': 'At least one field must be provided for update',
		}),
};
