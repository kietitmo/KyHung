import ProductRepository from '../../data-access/repositories/productRepository.js';
import Pagination from '../dto/pagination.js';
import ProductDTO from '../dto/productDTO.js';
import { errorCode } from '../../utils/productResponseCode.js';
import CustomError from '../dto/customError.js';

class ProductService {
	static getProducts = async (getProductRequest) => {
		const offset = (getProductRequest.page - 1) * getProductRequest.limit;

		const products = await ProductRepository.findAllWithFilterAndPagination(
			getProductRequest.filter,
			getProductRequest.limit,
			offset
		);
		const total = await ProductRepository.count();
		const totalPages = Math.ceil(total / getProductRequest.limit);
		const productResponse = products.map((product) =>
			ProductDTO.fromEntity(product)
		);

		return new Pagination(
			productResponse,
			getProductRequest.page,
			getProductRequest.limit,
			total,
			totalPages,
			getProductRequest.filter
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
