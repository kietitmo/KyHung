import ProductRepository from '../../data-access/repositories/productRepository.js';
import Pagination from '../custom/pagination.js';
import ProductDTO from '../dto/product/productDTO.js';
import { errorCode } from '../../utils/code/productResponseCode.js';
import CustomError from '../custom/customError.js';

class ProductService {
	constructor() {
		this.productRepository = new ProductRepository();
	}
	async getProducts(getAllRequest) {
		const offset = (getAllRequest.page - 1) * getAllRequest.limit;

		const products = await this.productRepository.findAllWithFilterAndPagination(
			getAllRequest.filter,
			getAllRequest.limit,
			offset,
			['category']
		);
		const total = products.length;
		const totalPages = Math.ceil(total / getAllRequest.limit);
		const productResponse = products.map((product) =>
			ProductDTO.fromEntity(product)
		);

		return new Pagination(
			productResponse,
			getAllRequest.page,
			getAllRequest.limit,
			total,
			totalPages,
			getAllRequest.filter
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
