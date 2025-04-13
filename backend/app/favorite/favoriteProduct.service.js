import UserRepository from '../../../user/user.repository.js';
import ProductRepository from '../../../product/product.repository.js';
import UserDTO from '../../../user/user/userDTO.js';
import { errorCode as userCode } from '../../utils/code/userResponseCode.js';
import { errorCode as productCode } from '../../utils/code/productResponseCode.js';
import CustomError from '../../../common/custom/error/customError.js';
import FavoriteProductDTO from '../dto/favoriteProduct/favoriteProductDTO.js';
import ProductDTO from '../dto/product/productDTO.js';

class FavoriteProductService {
	constructor() {
		this.userRepository = new UserRepository();
		this.productRepository = new ProductRepository();
	}

	async createFavoriteProduct(favoriteProduct) {
		const { productId, email } = favoriteProduct;
		let user = await this.userRepository.findOne({ email }, ['favoriteProducts']);
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		const product = await this.productRepository.findOne({ _id: productId });
		if (!product) {
			throw new CustomError(productCode.PRODUCT_NOT_FOUND);
		}

		if (user.favoriteProducts.some((fav) => fav._id.equals(product._id))) {
			throw new CustomError(productCode.PRODUCT_ALREADY_IN_FAVORITE);
		}

		user.favoriteProducts.push(product._id);
		user = await this.userRepository.update({ email: user.email }, user);

		const productFav = new FavoriteProductDTO({
			email: user.email,
			productId: product._id,
		});

		return productFav;
	}

	async removeFavoriteProduct(favoriteProduct) {
		const { productId, email } = favoriteProduct;
		let user = await this.userRepository.findOne({ email }, ['favoriteProducts']);
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		const product = await this.productRepository.findOne({ _id: productId });
		if (!product) {
			throw new CustomError(productCode.PRODUCT_NOT_FOUND);
		}

		if (!user.favoriteProducts.some((fav) => fav._id.equals(product._id))) {
			throw new CustomError(productCode.PRODUCT_NOT_IN_FAVORITE);
		}

		user.favoriteProducts.pull(product._id);
		this.userRepository.update({ email: user.email }, user);
		const productFav = new FavoriteProductDTO({
			email: user.email,
			productId: product._id,
		});

		return productFav;
	}

	async getFavoriteProducts(email) {
		const user = await this.userRepository.findOne({ email }, [
			{
				path: 'favoriteProducts',
				populate: {
					path: 'category',
					model: 'Category',
				},
			},
		]);
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		return user.favoriteProducts;
	}
}
export default FavoriteProductService;
