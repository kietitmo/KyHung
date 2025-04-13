class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	async findAllWithFilterAndPagination(
		filter = {},
		limit,
		offset,
		populate = [],
		sort = {}
	) {
		let query = this.model.find(filter).skip(offset).limit(limit);

		if (Object.keys(sort).length > 0) {
			query = query.sort(sort);
		}

		if (populate.length > 0) {
			populate.forEach((field) => {
				query = query.populate(field);
			});
		}

		return await query.exec();
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

		return await query.exec();
	}

	async findMany(condition, populate = [], sort = {}) {
		let query = this.model.find(condition);

		if (Object.keys(sort).length > 0) {
			query = query.sort(sort);
		}

		if (populate.length > 0) {
			populate.forEach((field) => {
				query = query.populate(field);
			});
		}

		return await query.exec();
	}

	async countDocuments(condition = {}) {
		return this.model.countDocuments(condition);
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
