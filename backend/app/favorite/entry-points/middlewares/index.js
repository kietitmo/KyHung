export { createFavoriteValidator } from './favoriteCreate.validator.js';
export { updateFavoriteValidator } from './favoriteUpdate.validator.js';
export { getFavoriteValidator } from './favoriteGet.validator.js';

const favoriteMiddlewares = {
	create: createFavoriteValidator,
	update: updateFavoriteValidator,
	get: getFavoriteValidator,
};

export default favoriteMiddlewares;
