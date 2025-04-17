import ProductService from '../../domain/services/product.service.js';
import APIResponse from '../../../common/custom/apiResponse.js';
import ProductRequestDTO from '../../dto/request/productRequestDTO.js';
import ProductDTO from '../../dto/response/productDTO.js';
import GetAllRequestDTO from '../../../common/dto/getAllRequestDTO.js';
import { successCode } from '../../common/constants/productResponseCode.js';
import controllerHelper from '../../../common/utils/helper.js';
import Pagination from '../../../common/custom/pagination.js';

class ProductController {
	constructor() {
		this.productService = new ProductService();
	}

	async createProduct(req, res, next) {
		controllerHelper.handleAsync(async () => {
			controllerHelper.log('info', 'Creating new product', req.body);
			const productRequest = ProductRequestDTO.fromRequest(req.body);
			const product = await this.productService.createProduct(productRequest);
			const productResponse = ProductDTO.fromEntity(product);

			controllerHelper.log('info', 'Product created successfully', {
				id: product._id,
				name: product.name,
			});
			return res.status(successCode.PRODUCT_CREATED).json(productResponse);
		});
	}

	async getProducts(req, res, next) {
		try {
			const getProductRequest = GetAllRequestDTO.fromRequest(req);
			const products = await this.productService.getProducts(getProductRequest);

			const total = await this.productService.getTotalProducts(
				getProductRequest.filter
			);
			const totalPages = Math.ceil(total / getProductRequest.limit);
			const productDTO = products.map((product) => ProductDTO.fromEntity(product));

			const productsResponse = new Pagination(
				productDTO,
				getProductRequest.page,
				getProductRequest.limit,
				total,
				totalPages,
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
		controllerHelper.handleAsync(async () => {
			const product = await this.productService.getProductById(req.params.id);
			const productResponse = ProductDTO.fromEntity(product);

			return res.status(successCode.PRODUCT_GET).json(productResponse);
		});
	}

	async updateProductById(req, res, next) {
		controllerHelper.handleAsync(async () => {
			const updateProduct = ProductRequestDTO.fromRequest(req.body);
			const product = await this.productService.updateProductById(
				req.params.id,
				updateProduct
			);

			const productResponse = ProductDTO.fromEntity(product);
			const response = APIResponse.success(
				successCode.PRODUCT_UPDATED.message,
				productResponse
			);
			return res.status(successCode.PRODUCT_UPDATED).json(response);
		});
	}

	async deleteProductById(req, res, next) {
		controllerHelper.handleAsync(async () => {
			await this.productService.deleteProductById(req.params.id);
			const response = APIResponse.success(
				successCode.PRODUCT_DELETED.message,
				Null
			);
			return res.status(successCode.PRODUCT_DELETED).json(response);
		});
	}
}

export default ProductController;
