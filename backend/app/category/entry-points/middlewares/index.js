import { createCategoryValidator } from './categoryCreate.validator.js';
import { updateCategoryValidator } from './categoryUpdate.validator.js';
import { getCategoryValidator } from './categoryGet.validator.js';

const categoryMiddlewares = {
	create: createCategoryValidator,
	update: updateCategoryValidator,
	get: getCategoryValidator,
};

export default categoryMiddlewares;
