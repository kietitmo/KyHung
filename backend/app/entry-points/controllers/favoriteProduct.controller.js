import FavoriteProductService from '../../domain/services/favoriteProduct.service.js';
import APIResponse from '../../domain/custom/apiResponse.js';
import { successCode } from '../../utils/code/userResponseCode.js';
import FavoriteProductDTO from '../../domain/dto/favoriteProduct/favoriteProductDTO.js';
import ProductDTO from '../../domain/dto/product/productDTO.js';
class FavoriteProductController {
	constructor() {
		this.favoriteProductService = new FavoriteProductService();
	}

	async createFavoriteProduct(req, res, next) {
		try {
			const createFavoriteProduct = FavoriteProductDTO.fromRequest(req.body);
			const userDto = await this.favoriteProductService.createFavoriteProduct(
				createFavoriteProduct
			);

			const response = APIResponse.success(
				successCode.USER_ADDED_FAVORITE_PRODUCT.code,
				successCode.USER_ADDED_FAVORITE_PRODUCT.message,
				userDto
			);
			return res
				.status(successCode.USER_ADDED_FAVORITE_PRODUCT.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async removeFavoriteProduct(req, res, next) {
		try {
			const removeFavoriteProductRequest = FavoriteProductDTO.fromRequest(
				req.body
			);
			const userDto = await this.favoriteProductService.removeFavoriteProduct(
				removeFavoriteProductRequest
			);

			const response = APIResponse.success(
				successCode.USER_REMOVED_FAVORITE_PRODUCT.code,
				successCode.USER_REMOVED_FAVORITE_PRODUCT.message,
				userDto
			);
			return res
				.status(successCode.USER_REMOVED_FAVORITE_PRODUCT.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async getFavoriteProducts(req, res, next) {
		try {
			const favoriteProducts =
				await this.favoriteProductService.getFavoriteProducts(req.params.email);
			const productResponse = favoriteProducts.map((product) =>
				ProductDTO.fromEntity(product)
			);
			const response = APIResponse.success(
				successCode.USER_GET_FAVORITE_PRODUCTS.code,
				successCode.USER_GET_FAVORITE_PRODUCTS.message,
				productResponse
			);
			return res
				.status(successCode.USER_GET_FAVORITE_PRODUCTS.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default FavoriteProductController;
