import ProductService from '../../domain/services/product.service.js';
import APIResponse from '../../../common/custom/apiResponse.js';
import ProductAdminDTO from '../../dto/response/productAdminDTP.js';

import GetAllRequestDTO from '../../../common/dto/getAllRequestDTO.js';
import ProductRequestDTO from '../../dto/request/productRequestDTO.js';
import Pagination from '../../../common/custom/pagination.js';

import { successCode } from '../../common/constants/productResponseCode.js';

class AdminController {
	constructor() {
		this.productService = new ProductService();
	}

	async createProduct(req, res, next) {
		try {
			const productRequest = ProductRequestDTO.fromRequest(req.body);
			const product = await this.productService.createProduct(productRequest);
			const productResponse = ProductAdminDTO.fromEntity(product);

			return res
				.status(successCode.PRODUCT_CREATED.httpStatusCode)
				.json(productResponse);
		} catch (error) {
			next(error);
		}
	}

	async getProducts(req, res, next) {
		try {
			const getProductRequest = GetAllRequestDTO.fromRequest(req);
			const products = await this.productService.getProducts(getProductRequest);

			const total = await this.productService.getTotalProducts(
				getProductRequest.filter
			);
			const totalPages = Math.ceil(total / getProductRequest.limit);
			const productDTO = products.map((product) =>
				ProductAdminDTO.fromEntity(product)
			);

			const productsResponse = new Pagination(
				productDTO,
				getProductRequest.page,
				getProductRequest.limit,
				total,
				totalPages,
				getProductRequest.filter,
				getProductRequest.sort
			);

			const response = APIResponse.success(
				successCode.PRODUCTS_GET_ALL.message,
				productsResponse
			);
			return res
				.status(successCode.PRODUCTS_GET_ALL.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async getProductById(req, res, next) {
		try {
			const product = await this.productService.getProductById(req.params.id);
			const productResponse = ProductAdminDTO.fromEntity(product);

			return res
				.status(successCode.PRODUCT_GET_BY_ID.httpStatusCode)
				.json(productResponse);
		} catch (error) {
			next(error);
		}
	}

	async updateProductById(req, res, next) {
		try {
			const updateProduct = ProductRequestDTO.fromRequest(req.body);
			const product = await this.productService.updateProductById(
				req.params.id,
				updateProduct
			);

			const productResponse = ProductAdminDTO.fromEntity(product);
			const response = APIResponse.success(
				successCode.PRODUCT_UPDATED.message,
				productResponse
			);
			return res.status(successCode.PRODUCT_UPDATED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async deleteProductById(req, res, next) {
		try {
			await this.productService.deleteProductById(req.params.id);
			const response = APIResponse.success(
				successCode.PRODUCT_DELETED.message,
				null
			);
			return res.status(successCode.PRODUCT_DELETED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default AdminController;
