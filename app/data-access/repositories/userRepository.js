import User from '../../domain/models/user.js';

class UserRepository {
	static findAllPagination = async (limit, offset) => {
		return User.find().skip(offset).limit(limit);
	};

	static findAll = async () => {
		return User.find();
	};

	static count = async () => {
		return User.countDocuments();
	};

	static findByEmail = async (email) => {
		return User.findOne({ email });
	};

	static create = async (data) => {
		return User.create(data);
	};

	static updateByEmail = async (email, data) => {
		return User.findOneAndUpdate({ email }, data, { new: true });
	};

	static deleteByEmail = async (email) => {
		return User.findOneAndDelete({ email });
	};
}

export default UserRepository;
