import FavoriteService from '../../domain/services/favorite.service.js';
import APIResponse from '../../../common/custom/apiResponse.js';
import { successCode } from '../../common/constants/favoriteResponseCode.js';
import RequestFavoriteDTO from '../../dto/request/requestFavoriteDTO.js';
import FavoriteDTO from '../../dto/response/favoriteDTO.js';
import CustomError from '../../../common/custom/error/customError.js';
import { errorCode as favoriteCode } from '../../common/constants/favoriteResponseCode.js';

class FavoriteController {
	constructor() {
		this.favoriteService = new FavoriteService();
	}

	async createFavoriteProduct(req, res, next) {
		try {
			if (req.user.email !== req.body.email) {
				throw new CustomError(favoriteCode.USER_NOT_AUTHORIZED);
			}
			req.body.email = req.user.email;

			const createFavoriteProduct = RequestFavoriteDTO.fromRequest(req.body);
			const favorite = await this.favoriteService.createFavoriteProduct(
				createFavoriteProduct
			);

			const favoriteDto = FavoriteDTO.fromEntity(favorite);

			const response = APIResponse.success(
				successCode.USER_ADDED_FAVORITE_PRODUCT.message,
				favoriteDto
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
			if (req.user.email !== req.params.email) {
				throw new CustomError(favoriteCode.USER_NOT_AUTHORIZED);
			}

			const productId = req.params.productId;
			const email = req.user.email;

			const favorite = await this.favoriteService.removeFavoriteProduct(
				productId,
				email
			);

			const response = APIResponse.success(
				successCode.USER_REMOVED_FAVORITE_PRODUCT.message,
				true
			);

			return res
				.status(successCode.USER_REMOVED_FAVORITE_PRODUCT.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async updateFavoriteProduct(req, res, next) {
		try {
			req.body.email = req.user.email;

			const updateFavoriteProductRequest = RequestFavoriteDTO.fromRequest(
				req.body
			);
			updateFavoriteProductRequest.productId = req.params.productId;
			updateFavoriteProductRequest.email = req.user.email;

			const favorite = await this.favoriteService.updateFavoriteProduct(
				updateFavoriteProductRequest
			);

			const favoriteDto = FavoriteDTO.fromEntity(favorite);

			const response = APIResponse.success(
				successCode.USER_UPDATED_FAVORITE_PRODUCT.message,
				favoriteDto
			);

			return res
				.status(successCode.USER_UPDATED_FAVORITE_PRODUCT.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async getFavoriteProductsByEmail(req, res, next) {
		try {
			const email = req.user.email;
			const favoriteProducts =
				await this.favoriteService.getFavoriteProductsByEmail(email);

			const favoriteResponse = favoriteProducts.map((favorite) =>
				FavoriteDTO.fromEntity(favorite)
			);

			const response = APIResponse.success(
				successCode.USER_GET_FAVORITE_PRODUCTS.message,
				favoriteResponse
			);

			return res
				.status(successCode.USER_GET_FAVORITE_PRODUCTS.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async getFavoriteProductsByEmailAndProductId(req, res, next) {
		try {
			const email = req.user.email;
			const productId = req.params.productId;

			const favorite =
				await this.favoriteService.getFavoriteProductsByEmailAndProductId(
					email,
					productId
				);

			const favoriteDto = FavoriteDTO.fromEntity(favorite);

			const response = APIResponse.success(
				successCode.USER_GET_FAVORITE_PRODUCTS.message,
				favoriteDto
			);

			return res
				.status(successCode.USER_GET_FAVORITE_PRODUCTS.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async removeAllFavoriteProductsByEmail(req, res, next) {
		try {
			const email = req.user.email;
			await this.favoriteService.removeAllFavoriteProducts(email);

			const response = APIResponse.success(
				successCode.USER_REMOVED_ALL_FAVORITE_PRODUCTS.message,
				true
			);

			return res
				.status(successCode.USER_REMOVED_ALL_FAVORITE_PRODUCTS.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default FavoriteController;
