import Product from '../../domain/models/product.js';

class ProductRepository {
	static findAllWithFilterAndPagination = async (
		filter = {},
		limit = 10,
		offset = 0
	) => {
		return Product.find(filter).skip(offset).limit(limit);
	};

	static count = async () => {
		return Product.countDocuments();
	};

	static findById = async (id) => {
		return Product.findById(id);
	};

	static findByName = async (name) => {
		return Product.findById({ name });
	};

	static create = async (data) => {
		return Product.create(data);
	};

	static updateById = async (id, data) => {
		return Product.findByIdAndUpdate(id, data, { new: true });
	};

	static deleteById = async (id) => {
		return Product.findByIdAndDelete(id);
	};
}

export default ProductRepository;
