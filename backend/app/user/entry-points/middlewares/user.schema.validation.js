import Joi from 'joi';
import Role from '../../../user/domain/models/role.enum.js';
import Gender from '../../../user/domain/models/gender.enum.js';
import State from '../../../user/domain/models/state.enum.js';
import OAuthProvider from '../../../user/domain/models/oauthprovider.enum.js';
import env from '../../../common/config/env.js';

export const createUserSchema = {
	admin: Joi.object({
		fullName: Joi.string().min(3).max(100).required().messages({
			'string.empty': 'Full name is required',
			'string.min': 'Full name must be at least 3 characters',
			'string.max': 'Full name cannot exceed 100 characters',
		}),

		email: Joi.string().email().required().messages({
			'string.empty': 'Email is required',
			'string.email': 'Email must be a valid email',
		}),

		password: Joi.string()
			.when('oauth', {
				is: Joi.array().min(1),
				then: Joi.string().optional(),
				otherwise: Joi.string().min(env.PASSWORD_MIN_LENGTH).required(),
			})
			.messages({
				'string.min': `Password must be at least ${env.PASSWORD_MIN_LENGTH} characters`,
				'any.required': 'Password is required if no OAuth provider is used',
			}),

		gender: Joi.string()
			.valid(...Object.values(Gender))
			.default(Gender.OTHER)
			.messages({
				'any.only': 'Invalid gender',
			}),

		phoneNumber: Joi.string().allow(null, '').messages({
			'string.base': 'Phone number must be a string',
		}),

		address: Joi.string().allow(null, '').messages({
			'string.base': 'Address must be a string',
		}),

		city: Joi.string().allow(null, '').messages({
			'string.base': 'City must be a string',
		}),

		country: Joi.string().allow(null, '').messages({
			'string.base': 'Country must be a string',
		}),

		role: Joi.string()
			.valid(...Object.values(Role))
			.default(Role.USER)
			.messages({
				'any.only': 'Invalid role',
			}),

		state: Joi.string()
			.valid(...Object.values(State))
			.default(State.INACTIVE)
			.messages({
				'any.only': 'Invalid state',
			}),
	}),
	user: Joi.object({
		fullName: Joi.string().min(3).max(100).required().messages({
			'string.empty': 'Full name is required',
			'string.min': 'Full name must be at least 3 characters',
			'string.max': 'Full name cannot exceed 100 characters',
		}),

		email: Joi.string().email().required().messages({
			'string.empty': 'Email is required',
			'string.email': 'Email must be a valid email',
		}),

		password: Joi.string()
			.when('oauth', {
				is: Joi.array().min(1),
				then: Joi.string().optional(),
				otherwise: Joi.string().min(env.PASSWORD_MIN_LENGTH).required(),
			})
			.messages({
				'string.min': `Password must be at least ${env.PASSWORD_MIN_LENGTH} characters`,
				'any.required': 'Password is required if no OAuth provider is used',
			}),

		gender: Joi.string()
			.valid(...Object.values(Gender))
			.default(Gender.OTHER)
			.messages({
				'any.only': 'Invalid gender',
			}),

		phoneNumber: Joi.string().allow(null, '').messages({
			'string.base': 'Phone number must be a string',
		}),

		address: Joi.string().allow(null, '').messages({
			'string.base': 'Address must be a string',
		}),

		city: Joi.string().allow(null, '').messages({
			'string.base': 'City must be a string',
		}),

		country: Joi.string().allow(null, '').messages({
			'string.base': 'Country must be a string',
		}),
	}),
};

export const updateUserSchema = {
	admin: Joi.object({
		fullName: Joi.string().min(3).max(100),

		email: Joi.string().email(),

		password: Joi.string().min(env.PASSWORD_MIN_LENGTH),

		oauth: Joi.array().items(
			Joi.object({
				provider: Joi.string()
					.valid(...Object.values(OAuthProvider))
					.required(),
				providerId: Joi.string().required(),
			})
		),

		gender: Joi.string().valid(...Object.values(Gender)),

		phoneNumber: Joi.string().allow(null, ''),

		address: Joi.string().allow(null, ''),

		city: Joi.string().allow(null, ''),

		country: Joi.string().allow(null, ''),

		role: Joi.string().valid(...Object.values(Role)),

		state: Joi.string().valid(...Object.values(State)),
	})
		.min(1)
		.messages({
			'object.min': 'At least one field must be provided for update',
		}),

	user: Joi.object({
		fullName: Joi.string().min(3).max(100),

		password: Joi.string().min(env.PASSWORD_MIN_LENGTH),

		gender: Joi.string().valid(...Object.values(Gender)),

		phoneNumber: Joi.string().allow(null, ''),

		address: Joi.string().allow(null, ''),

		city: Joi.string().allow(null, ''),

		country: Joi.string().allow(null, ''),
	})
		.min(1)
		.messages({
			'object.min': 'At least one field must be provided for update',
		}),
};
