import ProductService from '../../domain/services/product.service.js';
import APIResponse from '../../domain/custom/apiResponse.js';
import CreateProductDTO from '../../domain/dto/product/createProductDTO.js';
import ProductDTO from '../../domain/dto/product/productDTO.js';
import GetAllRequestDTO from '../../domain/dto/getAllRequestDTO.js';
import { successCode } from '../../utils/productResponseCode.js';
import UpdateProductDTO from '../../domain/dto/product/updateProductDTO.js';

class ProductController {
	constructor() {
		this.productService = new ProductService();
	}

	async createProduct(req, res, next) {
		try {
			const productRequest = CreateProductDTO.fromRequest(req.body);
			const product = await this.productService.createProduct(productRequest);
			const productResponse = ProductDTO.fromEntity(product);

			const response = APIResponse.success(
				successCode.PRODUCT_CREATED.code,
				successCode.PRODUCT_CREATED.message,
				productResponse
			);
			return res.status(successCode.PRODUCT_CREATED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async getProducts(req, res, next) {
		try {
			const getProductRequest = GetAllRequestDTO.fromRequest(req.body);
			const productResponse =
				await this.productService.getProducts(getProductRequest);

			const response = APIResponse.success(
				successCode.PRODUCTS_GET_ALL.code,
				successCode.PRODUCTS_GET_ALL.message,
				productResponse
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
			const productResponse = ProductDTO.fromEntity(product);

			const response = APIResponse.success(
				successCode.PRODUCT_GET.code,
				successCode.PRODUCT_GET.message,
				productResponse
			);
			return res.status(successCode.PRODUCT_GET.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async updateProductById(req, res, next) {
		try {
			const updateProduct = UpdateProductDTO.fromRequest(req.body);
			const product = await this.productService.updateProductById(
				req.params.id,
				updateProduct
			);

			const productResponse = ProductDTO.fromEntity(product);
			const response = APIResponse.success(
				successCode.PRODUCT_UPDATED.code,
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
			const product = await this.productService.getProductById(req.params.id);

			await this.productService.deleteProductById(req.params.id);
			const response = APIResponse.success(
				successCode.PRODUCT_DELETED.code,
				successCode.PRODUCT_DELETED.message,
				null
			);
			return res.status(successCode.PRODUCT_DELETED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default ProductController;
