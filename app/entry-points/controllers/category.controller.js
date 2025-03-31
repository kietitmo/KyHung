import CategoryService from '../../domain/services/category.service.js';
import APIResponse from '../../domain/custom/apiResponse.js';
import { successCode } from '../../utils/categoryResponseCode.js';
import CreateCategoryDTO from '../../domain/dto/category/createCategoryDTO.js';
import GetAllRequestDTO from '../../domain/dto/getAllRequestDTO.js';
import UpdateCategoryDTO from '../../domain/dto/category/updateCategoryDTO.js';

class CategoryController {
	constructor() {
		this.categoryService = new CategoryService();
	}

	async createCategory(req, res, next) {
		try {
			const categoryData = new CreateCategoryDTO(req.body);
			const category = await this.categoryService.createCategory(categoryData);

			const response = APIResponse.success(
				successCode.CATEGORY_CREATED.code,
				successCode.CATEGORY_CREATED.message,
				category
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
			const categoriesResponse =
				await this.categoryService.getCategories(getCategoryRequest);

			const response = APIResponse.success(
				successCode.CATEGORIES_GET_ALL.code,
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
			const response = APIResponse.success(
				successCode.CATEGORY_GET.code,
				successCode.CATEGORY_GET.message,
				category
			);
			return res.status(successCode.CATEGORY_GET.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}

	async updateCategoryById(req, res, next) {
		try {
			const updateCategoryData = new UpdateCategoryDTO(req.body);
			const category = await this.categoryService.updateCategoryById(
				req.params.id,
				updateCategoryData
			);
			const response = APIResponse.success(
				successCode.CATEGORY_UPDATED.code,
				successCode.CATEGORY_UPDATED.message,
				category
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
				successCode.CATEGORY_DELETED.code,
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

export default CategoryController;
