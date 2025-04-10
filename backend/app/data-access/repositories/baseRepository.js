class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	async findAllWithFilterAndPagination(
		filter = {},
		limit = 10,
		offset = 0,
		populate = []
	) {
		let query = this.model.find(filter).skip(offset).limit(limit);

		if (populate.length > 0) {
			populate.forEach((field) => {
				query = query.populate(field);
			});
		}

		return query;
	}

	async count(filter = {}) {
		return this.model.countDocuments(filter);
	}

	async findOne(condition, populate = []) {
		let query = this.model.findOne(condition);

		if (populate.length > 0) {
			populate.forEach((field) => {
				query = query.populate(field);
			});
		}

		return query;
	}

	async findMany(condition, populate = []) {
		let query = this.model.find(condition);

		if (populate.length > 0) {
			populate.forEach((field) => {
				query = query.populate(field);
			});
		}

		return query;
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

	async deleteMany(condition) {
		return this.model.deleteMany(condition);
	}
}

export default BaseRepository;
