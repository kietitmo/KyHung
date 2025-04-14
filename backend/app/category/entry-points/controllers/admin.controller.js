import CategoryService from '../../domain/services/category.service.js';
import APIResponse from '../../../common/custom/apiResponse.js';
import { successCode } from '../../common/constants/categoryResponseCode.js';
import RequestCategoryDTO from '../../dto/request/RequestCategoryDTO.js';
import GetAllRequestDTO from '../../../common/dto/getAllRequestDTO.js';
import Pagination from '../../../common/custom/pagination.js';
import CategoryAdminDTO from '../../dto/response/categoryAdminDTO.js';
class AdminController {
	constructor() {
		this.categoryService = new CategoryService();
	}

	async createCategory(req, res, next) {
		try {
			const categoryData = new RequestCategoryDTO(req.body);
			const category = await this.categoryService.createCategory(categoryData);
			const categoryDto = CategoryAdminDTO.fromEntity(category);
			const response = APIResponse.success(
				successCode.CATEGORY_CREATED.message,
				categoryDto
			);
			return res
				.status(successCode.CATEGORY_CREATED.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async getCategories(req, res, next) {
		try {
			const getCategoryRequest = new GetAllRequestDTO(req.body);
			const categories =
				await this.categoryService.getCategories(getCategoryRequest);

			const total = await this.categoryService.getTotalCategories(
				getCategoryRequest.filter
			);
			const totalPages = Math.ceil(total / getCategoryRequest.limit);
			const categoriesDtos = categories.map((category) =>
				CategoryAdminDTO.fromEntity(category)
			);

			const categoriesResponse = new Pagination(
				categoriesDtos,
				getCategoryRequest.page,
				getCategoryRequest.limit,
				total,
				totalPages,
				getCategoryRequest.filter,
				getCategoryRequest.sort
			);

			const response = APIResponse.success(
				successCode.CATEGORIES_GET_ALL.message,
				categoriesResponse
			);

			return res
				.status(successCode.CATEGORIES_GET_ALL.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async getCategoryById(req, res, next) {
		try {
			const category = await this.categoryService.getCategoryById(req.params.id);
			const categoryDto = CategoryAdminDTO.fromEntity(category);
			const response = APIResponse.success(
				successCode.CATEGORY_GET.message,
				categoryDto
			);
			return res.status(successCode.CATEGORY_GET.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async updateCategoryById(req, res, next) {
		try {
			const updateCategoryData = new RequestCategoryDTO(req.body);
			const category = await this.categoryService.updateCategoryById(
				req.params.id,
				updateCategoryData
			);
			const categoryDto = CategoryAdminDTO.fromEntity(category);
			const response = APIResponse.success(
				successCode.CATEGORY_UPDATED.message,
				categoryDto
			);
			return res
				.status(successCode.CATEGORY_UPDATED.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}

	async deleteCategoryById(req, res, next) {
		try {
			await this.categoryService.deleteCategoryById(req.params.id);
			const response = APIResponse.success(
				successCode.CATEGORY_DELETED.message,
				null
			);
			return res
				.status(successCode.CATEGORY_DELETED.httpStatusCode)
				.json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default AdminController;
