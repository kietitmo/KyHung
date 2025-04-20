import Joi from 'joi';

/**
 * Schema for creating a new product
 */
export const createProductSchema = {
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

		price: Joi.number().required().min(0).precision(2).messages({
			'number.base': 'Price must be a number',
			'number.min': 'Price cannot be negative',
			'any.required': 'Price is required',
		}),

		category: Joi.string().required().trim().messages({
			'string.empty': 'Category is required',
			'any.required': 'Category is required',
		}),

		images: Joi.array().items(Joi.string().uri()).max(5).messages({
			'array.max': 'Cannot exceed 5 images',
			'string.uri': 'Invalid image URL',
		}),

		videos: Joi.array().items(Joi.string().uri()).max(3).messages({
			'array.max': 'Cannot exceed 3 videos',
			'string.uri': 'Invalid video URL',
		}),
	}),
};

/**
 * Schema for updating a product
 */
export const updateProductSchema = {
	admin: Joi.object({
		name: Joi.string().min(3).max(100).trim().messages({
			'string.min': 'Product name must be at least 3 characters long',
			'string.max': 'Product name cannot exceed 100 characters',
		}),

		description: Joi.string().min(10).max(1000).trim().messages({
			'string.min': 'Product description must be at least 10 characters long',
			'string.max': 'Product description cannot exceed 1000 characters',
		}),

		price: Joi.number().min(0).precision(2).messages({
			'number.base': 'Price must be a number',
			'number.min': 'Price cannot be negative',
		}),

		category: Joi.string().trim().messages({
			'string.empty': 'Category cannot be empty',
		}),

		images: Joi.array().items(Joi.string().uri()).max(5).messages({
			'array.max': 'Cannot exceed 5 images',
			'string.uri': 'Invalid image URL',
		}),

		videos: Joi.array().items(Joi.string().uri()).max(3).messages({
			'array.max': 'Cannot exceed 3 videos',
			'string.uri': 'Invalid video URL',
		}),
	})
		.min(1)
		.messages({
			'object.min': 'At least one field must be provided for update',
		}),
};
