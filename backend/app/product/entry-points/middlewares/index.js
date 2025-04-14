export { createProductValidator } from './productCreate.validator.js';
export { updateProductValidator } from './productUpdate.validator.js';
export { getProductValidator } from './productGet.validator.js';

const productMiddlewares = {
	create: createProductValidator,
	update: updateProductValidator,
	get: getProductValidator,
};

export default productMiddlewares;
