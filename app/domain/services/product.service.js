import ProductRepository from '../../data-access/repositories/productRepository.js';
import Pagination from '../custom/pagination.js';
import ProductDTO from '../dto/productDTO.js';
import { errorCode } from '../../utils/productResponseCode.js';
import CustomError from '../custom/customError.js';

class ProductService {
	static getProducts = async (getAllRequest) => {
		const offset = (getAllRequest.page - 1) * getAllRequest.limit;

		const products = await ProductRepository.findAllWithFilterAndPagination(
			getAllRequest.filter,
			getAllRequest.limit,
			offset
		);
		const total = await ProductRepository.count();
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
	};

	static getProductById = async (id) => {
		const product = await ProductRepository.findById(id);
		if (!product) {
			throw new CustomError(errorCode.PRODUCT_NOT_FOUND);
		}
		return product;
	};

	static createProduct = async (productData) => {
		const product = await ProductRepository.findByName(productData.name);
		if (product) {
			throw new CustomError(errorCode.PRODUCT_ALREADY_EXISTS);
		}
		return ProductRepository.create(productData);
	};

	static updateProductById = async (id, productData) => {
		const product = await ProductRepository.findById(id);
		if (!product) {
			throw new CustomError(errorCode.PRODUCT_NOT_FOUND);
		}
		return ProductRepository.updateById(id, productData);
	};

	static deleteProductById = async (id) => {
		const product = await ProductRepository.findById(id);
		if (!product) {
			throw new CustomError(errorCode.PRODUCT_NOT_FOUND);
		}
		return ProductRepository.deleteById(id);
	};
}

export default ProductService;
