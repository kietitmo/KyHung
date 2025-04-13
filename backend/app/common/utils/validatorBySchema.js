import CustomError from '../custom/error/customError.js';
import { errorCode } from '../constants/commonResponseCode.js';

const baseValidators = {
	string: (value, rule = {}) => {
		if (typeof value !== 'string') return false;
		if (rule.trim && value.trim().length === 0) return false;
		if (rule.regex && !rule.regex.test(value)) return false;
		return true;
	},

	boolean: (value) => typeof value === 'boolean',

	enum: (value, rule) => rule.values.includes(value),

	number: (value, rule = {}) => {
		if (typeof value !== 'number') return false;
		if (rule.min !== undefined && value < rule.min) return false;
		if (rule.max !== undefined && value > rule.max) return false;
		return true;
	},
};

export const validateObjectWithSchema = (data, schema, options = {}) => {
	const { role = 'user', allowedFieldsByRole = null, required = [] } = options;

	// Check required fields
	for (const field of required) {
		if (!(field in data)) {
			throw new CustomError(errorCode.USER_REQUIRED_FIELDS_MISSING);
		}
	}

	// Check permission-based allowed fields
	if (allowedFieldsByRole) {
		const allowedFields = allowedFieldsByRole[role] || [];
		for (const field of Object.keys(data)) {
			if (!allowedFields.includes(field)) {
				const customMessage = `Update field: ${field} is not allowed`;
				throw new CustomError(
					errorCode.USER_UNAUTHORIZED_FIELD_UPDATE,
					customMessage
				);
			}
		}
	}

	// Field validations
	for (const [field, rule] of Object.entries(schema)) {
		if (data[field] === undefined) continue;

		const value = data[field];
		const validatorFn = baseValidators[rule.type];
		if (!validatorFn) {
			throw new CustomError(errorCode.UNKNOWN_VALIDATOR_TYPE);
		}

		const isValid = validatorFn(value, rule);
		if (!isValid) {
			throw new CustomError(rule.errorCode || errorCode.BAD_REQUEST);
		}
	}
};
