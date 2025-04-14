import CategoryRepository from '../../data-access/category.repository.js';
import Pagination from '../../../common/custom/pagination.js';
import CategoryDTO from '../../dto/response/categoryDTO.js';
import { errorCode } from '../../../category/common/constants/categoryResponseCode.js';
import CustomError from '../../../common/custom/error/customError.js';

class CategoryService {
	constructor() {
		this.categoryRepository = new CategoryRepository();
	}
	async getTotalCategories(condition) {
		return await this.categoryRepository.countDocuments(condition);
	}
	async getCategories(getAllRequest) {
		const offset = (getAllRequest.page - 1) * getAllRequest.limit;

		const categories =
			await this.categoryRepository.findAllWithFilterAndPagination(
				getAllRequest.filter,
				getAllRequest.limit,
				offset
			);
		return categories;
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
