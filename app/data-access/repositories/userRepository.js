import User from '../../domain/models/user.js';
import BaseRepository from './baseRepository.js'; // Import BaseRepository

class UserRepository extends BaseRepository {
	constructor() {
		super(User);
	}
}

export default UserRepository;

// import User from '../../domain/models/user.js';

// class UserRepository {
// 	static findAllPagination = async (filter, limit, offset) => {
// 		return User.find(filter).skip(offset).limit(limit);
// 	};

// 	static findAll = async () => {
// 		return User.find();
// 	};

// 	static count = async () => {
// 		return User.countDocuments();
// 	};

// 	static findByEmail = async (email) => {
// 		return User.findOne({ email });
// 	};

// 	static create = async (data) => {
// 		return User.create(data);
// 	};

// 	static updateByEmail = async (email, data) => {
// 		return User.findOneAndUpdate({ email }, data, { new: true });
// 	};

// 	static deleteByEmail = async (email) => {
// 		return User.findOneAndDelete({ email });
// 	};
// }

// export default UserRepository;
