import CategoryRepository from '../../data-access/repositories/categoryRepository.js';
import Pagination from '../custom/pagination.js';
import CategoryDTO from '../dto/category/categoryDTO.js';
import { errorCode } from '../../utils/code/categoryResponseCode.js';
import CustomError from '../custom/customError.js';

class CategoryService {
	constructor() {
		this.categoryRepository = new CategoryRepository();
	}
	async getCategories(getAllRequest) {
		const offset = (getAllRequest.page - 1) * getAllRequest.limit;

		const categories =
			await this.categoryRepository.findAllWithFilterAndPagination(
				getAllRequest.filter,
				getAllRequest.limit,
				offset
			);
		const total = await this.categoryRepository.count();
		const totalPages = Math.ceil(total / getAllRequest.limit);
		const categoryResponse = categories.map((category) =>
			CategoryDTO.fromEntity(category)
		);

		return new Pagination(
			categoryResponse,
			getAllRequest.page,
			getAllRequest.limit,
			total,
			totalPages,
			getAllRequest.filter
		);
	}

	async getCategoryById(id) {
		const category = await this.categoryRepository.findOne({ _id: id });
		if (!category) {
			throw new CustomError(errorCode.CATEGORY_NOT_FOUND);
		}
		return category;
	}

	async createCategory(categoryData) {
		const category = await this.categoryRepository.findOne({
			name: categoryData.name,
		});
		if (category) {
			throw new CustomError(errorCode.CATEGORY_ALREADY_EXISTS);
		}
		return this.categoryRepository.create(categoryData);
	}

	async updateCategoryById(id, categoryData) {
		const category = await this.categoryRepository.findOne({ _id: id });
		if (!category) {
			throw new CustomError(errorCode.CATEGORY_NOT_FOUND);
		}
		return this.categoryRepository.update({ _id: id }, categoryData);
	}

	async deleteCategoryById(id) {
		const category = await this.categoryRepository.findOne({ _id: id });
		if (!category) {
			throw new CustomError(errorCode.CATEGORY_NOT_FOUND);
		}
		return this.categoryRepository.delete({ _id: id });
	}
}

export default CategoryService;
