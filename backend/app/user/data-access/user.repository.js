import User from '../domain/models/user.model.js';
import BaseRepository from '../../common/base/baseRepository.js';

class UserRepository extends BaseRepository {
	constructor() {
		super(User);
	}
}

export default UserRepository;
