import ProductService from '../../domain/services/product.service.js';
import FileService from '../../../common/services/file-service/file.service.js';
import APIResponse from '../../../common/custom/apiResponse.js';
import ProductAdminDTO from '../../dto/response/productAdminDTO.js';

import GetAllRequestDTO from '../../../common/dto/getAllRequestDTO.js';
import ProductRequestDTO from '../../dto/request/productRequestDTO.js';
import Pagination from '../../../common/custom/pagination.js';

import { successCode } from '../../common/constants/productResponseCode.js';
import env from '../../../common/config/env.js';
import path from 'path';

class AdminController {
	constructor() {
		this.productService = new ProductService();
		this.fileService = new FileService();
	}

	async createProduct(req, res, next) {
		try {
			const productRequest = ProductRequestDTO.fromRequest(req.body);
			const product = await this.productService.createProduct(productRequest);

			if (req.files?.images?.length) {
				console.log(req.files.images);
				await this._processImageFiles(req.files.images, product);
			}

			if (req.files?.videos?.length) {
				console.log(req.files.videos);
				await this._processVideoFiles(req.files.videos, product);
			}

			if (req.files?.thumbnail) {
				console.log(req.files.thumbnail);
				await this._processThumbnailFile(req.files.thumbnail[0], product);
			}

			await product.save();

			const response = APIResponse.success(
				successCode.PRODUCT_CREATED.message,
				ProductAdminDTO.fromEntity(product)
			);

			return res.status(successCode.PRODUCT_CREATED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async getProducts(req, res, next) {
		try {
			const getProductRequest = GetAllRequestDTO.fromRequest(req);

			const [products, total] = await Promise.all([
				this.productService.getProducts(getProductRequest),
				this.productService.getTotalProducts(getProductRequest.filter),
			]);

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
			const response = APIResponse.success(
				successCode.PRODUCT_GET_BY_ID.message,
				ProductAdminDTO.fromEntity(product)
			);

			return res
				.status(successCode.PRODUCT_GET_BY_ID.httpStatusCode)
				.json(response);
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

			await this._deleteFiles(product); // Delete old files

			if (req.files?.images?.length) {
				await this._processImageFiles(req.files.images, product);
			}

			if (req.files?.videos?.length) {
				await this._processVideoFiles(req.files.videos, product);
			}

			if (req.files?.thumbnail) {
				await this._processThumbnailFile(req.files.thumbnail[0], product);
			}

			await product.save();

			const response = APIResponse.success(
				successCode.PRODUCT_UPDATED.message,
				ProductAdminDTO.fromEntity(product)
			);

			return res.status(successCode.PRODUCT_UPDATED.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async deleteProductById(req, res, next) {
		try {
			const product = await this.productService.getProductById(req.params.id);

			await this._deleteFiles(product);
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

	// Private helper method to process image files
	async _processImageFiles(files, product) {
		const imageDir = path.join(env.PRODUCT_IMAGE_DIR, product._id.toString());
		const uploadPromises = files.map(async (file) => {
			if (file.mimetype.startsWith('image/')) {
				const fileUrl = await this.fileService.uploadFile(file, imageDir);
				product.images.push(fileUrl);
			}
		});
		await Promise.all(uploadPromises);
	}

	// Private helper method to process video files
	async _processVideoFiles(files, product) {
		const videoDir = path.join(env.PRODUCT_VIDEO_DIR, product._id.toString());
		const uploadPromises = files.map(async (file) => {
			if (file.mimetype.startsWith('video/')) {
				const fileUrl = await this.fileService.uploadFile(file, videoDir);
				product.videos.push(fileUrl);
			}
		});
		await Promise.all(uploadPromises);
	}

	async _processThumbnailFile(file, product) {
		if (!file) return;

		const imageDir = path.join(env.PRODUCT_IMAGE_DIR, product._id.toString());
		if (file.mimetype.startsWith('image/')) {
			const fileUrl = await this.fileService.uploadFile(file, imageDir);
			product.thumbnail = fileUrl;
		}
	}

	async _deleteFiles(product) {
		// Delete files in parallel for better performance
		const deletePromises = [
			...product.images.map((fileUrl) => this.fileService.deleteFile(fileUrl)),
			...product.videos.map((fileUrl) => this.fileService.deleteFile(fileUrl)),
		];

		if (product.thumbnail) {
			deletePromises.push(this.fileService.deleteFile(product.thumbnail));
			product.thumbnail = null;
		}

		product.images = [];
		product.videos = [];

		await Promise.all(deletePromises);
	}
}

export default AdminController;
