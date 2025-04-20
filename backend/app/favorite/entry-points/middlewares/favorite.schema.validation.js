import Joi from 'joi';

/**
 * Schema for creating a new product
 */
export const createFavoriteSchema = {
	admin: Joi.object({
		email: Joi.string().required().email().trim().messages({
			'string.empty': 'Email is required',
			'any.required': 'Email is required',
		}),

		productId: Joi.string().required().trim().messages({
			'string.empty': 'Product ID is required',
			'any.required': 'Product ID is required',
		}),

		quantity: Joi.number().required().min(1).max(100).messages({
			'number.base': 'Quantity must be a number',
			'number.min': 'Quantity must be at least 1',
			'number.max': 'Quantity cannot exceed 100',
			'any.required': 'Quantity is required',
		}),

		note: Joi.string().optional().trim().messages({
			'string.empty': 'Note is required',
			'any.required': 'Note is required',
		}),
	}),
};

/**
 * Schema for updating a product
 */
export const updateFavoriteSchema = {
	admin: Joi.object({
		quantity: Joi.number().optional().min(1).max(100).messages({
			'number.base': 'Quantity must be a number',
			'number.min': 'Quantity must be at least 1',
			'number.max': 'Quantity cannot exceed 100',
			'any.required': 'Quantity is required',
		}),

		note: Joi.string().optional().trim().messages({
			'string.empty': 'Note is required',
			'any.required': 'Note is required',
		}),
	})
		.min(1)
		.messages({
			'object.min': 'At least one field must be provided for update',
		}),
};
