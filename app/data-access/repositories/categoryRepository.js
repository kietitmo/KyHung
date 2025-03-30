import Category from '../../domain/models/category.js';

class CategoryRepository {
	static findAllWithFilterAndPagination = async (
		filter = {},
		limit = 10,
		offset = 0
	) => {
		return Category.find(filter).skip(offset).limit(limit);
	};

	static count = async () => {
		return Category.countDocuments();
	};

	static findById = async (id) => {
		return Category.findById(id);
	};

	static findByName = async (name) => {
		return Category.findById({ name });
	};

	static create = async (data) => {
		return Category.create(data);
	};

	static updateById = async (id, data) => {
		return Category.findByIdAndUpdate(id, data, { new: true });
	};

	static deleteById = async (id) => {
		return Category.findByIdAndDelete(id);
	};
}

export default CategoryRepository;
