import ProductRepository from '../../data-access/product.repository.js';
import Pagination from '../../../common/custom/pagination.js';
import ProductDTO from '../../dto/productDTO.js';
import { errorCode } from '../../../product/common/constants/productResponseCode.js';
import CustomError from '../../../common/custom/error/customError.js';

class ProductService {
	constructor() {
		this.productRepository = new ProductRepository();
	}

	async getProducts(getAllRequest) {
		const offset = (getAllRequest.page - 1) * getAllRequest.limit;

		const result = await this.productRepository.findAllWithFilterAndPagination(
			getAllRequest.filter,
			getAllRequest.limit,
			offset,
			['category'],
			getAllRequest.sort
		);

		const total = await this.productRepository.countDocuments();
		const totalPages = Math.ceil(total / getAllRequest.limit);
		const productResponse = result.map((product) =>
			ProductDTO.fromEntity(product)
		);

		return new Pagination(
			productResponse,
			getAllRequest.page,
			getAllRequest.limit,
			total,
			totalPages,
			getAllRequest.filter,
			getAllRequest.sort
		);
	}

	async getProductById(id) {
		const product = await this.productRepository.findOne({ _id: id }, [
			'category',
		]);
		if (!product) {
			throw new CustomError(errorCode.PRODUCT_NOT_FOUND);
		}
		return product;
	}

	async createProduct(productData) {
		const product = await this.productRepository.findOne({
			name: productData.name,
		});
		if (product) {
			throw new CustomError(errorCode.PRODUCT_ALREADY_EXISTS);
		}
		return this.productRepository.create(productData);
	}

	async updateProductById(id, productData) {
		const product = await this.productRepository.findOne({ _id: id });
		if (!product) {
			throw new CustomError(errorCode.PRODUCT_NOT_FOUND);
		}
		return this.productRepository.update({ _id: id }, productData);
	}

	async deleteProductById(id) {
		const product = await this.productRepository.findOne({ _id: id });
		if (!product) {
			throw new CustomError(errorCode.PRODUCT_NOT_FOUND);
		}
		return this.productRepository.delete({ _id: id });
	}
}

export default ProductService;
