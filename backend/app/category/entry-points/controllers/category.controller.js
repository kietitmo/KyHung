import CategoryService from '../../domain/services/category.service.js';
import APIResponse from '../../../common/custom/apiResponse.js';
import { successCode } from '../../common/constants/categoryResponseCode.js';
import GetAllRequestDTO from '../../../common/dto/getAllRequestDTO.js';
import Pagination from '../../../common/custom/pagination.js';
import CategoryDTO from '../../dto/response/categoryDTO.js';
class CategoryController {
	constructor() {
		this.categoryService = new CategoryService();
	}

	async getCategories(req, res, next) {
		try {
			const getCategoryRequest = GetAllRequestDTO.fromRequest(req);
			const categories =
				await this.categoryService.getCategories(getCategoryRequest);

			const total = await this.categoryService.getTotalCategories(
				getCategoryRequest.filter
			);
			const totalPages = Math.ceil(total / getCategoryRequest.limit);
			const categoriesDtos = categories.map((category) =>
				CategoryDTO.fromEntity(category)
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
			const categoryDto = CategoryDTO.fromEntity(category);
			const response = APIResponse.success(
				successCode.CATEGORY_GET.message,
				categoryDto
			);
			return res.status(successCode.CATEGORY_GET.httpStatusCode).json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default CategoryController;
