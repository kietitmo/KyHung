import UserRepository from '../../../user/data-access/user.repository.js';
import ProductRepository from '../../../product/data-access/product.repository.js';
import FavoriteRepository from '../../data-access/repositories/favorite.repository.js';
import { errorCode as favoriteCode } from '../../../favorite/common/constants/favoriteResponseCode.js';
import CustomError from '../../../common/custom/error/customError.js';

class FavoriteService {
	constructor() {
		this.userRepository = new UserRepository();
		this.productRepository = new ProductRepository();
		this.favoriteRepository = new FavoriteRepository();
	}

	async createFavoriteProduct(favoriteProduct) {
		const { productId, email, quantity, note } = favoriteProduct;
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(favoriteCode.USER_NOT_FOUND);
		}

		const product = await this.productRepository.findOne({ _id: productId });
		if (!product) {
			throw new CustomError(favoriteCode.PRODUCT_NOT_FOUND);
		}

		let favorite = await this.favoriteRepository.findOne({
			user: user,
			product: product,
		});

		if (favorite) {
			throw new CustomError(favoriteCode.PRODUCT_ALREADY_IN_FAVORITE);
		}

		favorite = await this.favoriteRepository.create({
			user: user,
			product: product,
			quantity: quantity,
			note: note,
		});

		return favorite;
	}

	async removeFavoriteProduct(productId, email) {
		let user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(favoriteCode.USER_NOT_FOUND);
		}

		const product = await this.productRepository.findOne({ _id: productId });
		if (!product) {
			throw new CustomError(favoriteCode.PRODUCT_NOT_FOUND);
		}

		const favorite = await this.favoriteRepository.findOne({
			user: user,
			product: product,
		});

		if (!favorite) {
			throw new CustomError(favoriteCode.PRODUCT_NOT_IN_FAVORITE);
		}

		const deletedFavorite = await this.favoriteRepository.delete({
			user: user,
			product: product,
		});

		return deletedFavorite;
	}

	async getFavoriteProductsByEmail(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(favoriteCode.USER_NOT_FOUND);
		}

		const favorites = await this.favoriteRepository.findMany({ user: user }, [
			'product',
			'user',
		]);

		return favorites;
	}

	async updateFavoriteProduct(favoriteProduct) {
		const { productId, email, quantity, note } = favoriteProduct;
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(favoriteCode.USER_NOT_FOUND);
		}

		const product = await this.productRepository.findOne({ _id: productId });
		if (!product) {
			throw new CustomError(favoriteCode.PRODUCT_NOT_FOUND);
		}

		const favorite = await this.favoriteRepository.findOne(
			{
				user: user,
				product: product,
			},
			['product', 'user']
		);

		if (!favorite) {
			throw new CustomError(favoriteCode.PRODUCT_NOT_IN_FAVORITE);
		}

		const updatedFavorite = await this.favoriteRepository.update({
			user: user,
			product: product,
			quantity: quantity,
			note: note,
		});

		return updatedFavorite;
	}

	async getFavoriteProductsByEmailAndProductId(email, productId) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(favoriteCode.USER_NOT_FOUND);
		}

		const product = await this.productRepository.findOne({ _id: productId });
		if (!product) {
			throw new CustomError(favoriteCode.PRODUCT_NOT_FOUND);
		}

		const favorite = await this.favoriteRepository.findOne(
			{
				user: user,
				product: product,
			},
			['product', 'user']
		);

		return favorite;
	}

	async removeAllFavoriteProducts(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(favoriteCode.USER_NOT_FOUND);
		}

		const deletedFavorites = await this.favoriteRepository.deleteMany({
			user: user,
		});

		return deletedFavorites;
	}
}
export default FavoriteService;
