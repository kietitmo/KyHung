import UserRepository from '../../data-access/repositories/userRepository.js';
import ProductRepository from '../../data-access/repositories/productRepository.js';
import UserDTO from '../dto/user/userDTO.js';
import { errorCode as userCode } from '../../utils/code/userResponseCode.js';
import { errorCode as productCode } from '../../utils/code/productResponseCode.js';
import CustomError from '../custom/customError.js';

class FavoriteProductService {
	constructor() {
		this.userRepository = new UserRepository();
		this.productRepository = new ProductRepository();
	}

	async createFavoriteProduct(favoriteProduct) {
		const { productId, email } = favoriteProduct;
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		const product = await this.productRepository.findOne({ _id: productId });
		if (!product) {
			throw new CustomError(productCode.PRODUCT_NOT_FOUND);
		}

		if (user.favoriteProducts.includes(product._id)) {
			throw new CustomError(productCode.PRODUCT_ALREADY_IN_FAVORITE);
		}

		user.favoriteProducts.push(product._id);
		this.userRepository.update({ email: user.email }, user);
		const userResponse = UserDTO.fromEntity(user);

		return userResponse;
	}

	async removeFavoriteProduct(favoriteProduct) {
		const { productId, email } = favoriteProduct;
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		const product = await this.productRepository.findOne({ _id: productId });
		if (!product) {
			throw new CustomError(productCode.PRODUCT_NOT_FOUND);
		}

		if (!user.favoriteProducts.includes(product._id)) {
			throw new CustomError(productCode.PRODUCT_NOT_IN_FAVORITE);
		}

		user.favoriteProducts.pull(product._id);
		this.userRepository.update({ email: user.email }, user);
		const userResponse = UserDTO.fromEntity(user);

		return userResponse;
	}
}

export default FavoriteProductService;
