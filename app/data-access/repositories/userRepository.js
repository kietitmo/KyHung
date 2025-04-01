import User from '../../domain/models/user.js';
import BaseRepository from './baseRepository.js';

class UserRepository extends BaseRepository {
	constructor() {
		super(User);
	}

	// async findAllWithFilterAndPagination(filter = {}, limit = 10, offset = 0) {
	// 	return this.model
	// 		.find(filter)
	// 		.skip(offset)
	// 		.limit(limit)
	// 		.populate('favoriteProducts')
	// 		.exec();
	// }
}

export default UserRepository;
