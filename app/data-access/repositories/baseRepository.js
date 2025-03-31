class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	async findAllWithFilterAndPagination(filter = {}, limit = 10, offset = 0) {
		return this.model.find(filter).skip(offset).limit(limit);
	}

	async count() {
		return this.model.countDocuments();
	}

	async findOne(condition) {
		return this.model.findOne(condition);
	}

	async create(data) {
		return this.model.create(data);
	}

	async update(condition, data) {
		return this.model.findOneAndUpdate(condition, data, { new: true });
	}

	async delete(condition) {
		return this.model.findOneAndDelete(condition);
	}
}

export default BaseRepository;
