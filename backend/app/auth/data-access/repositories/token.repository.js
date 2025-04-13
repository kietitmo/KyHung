import Token from '../../domain/models/token.model.js';
import BaseRepository from '../../../common/base/baseRepository.js';

class TokenRepository extends BaseRepository {
	constructor() {
		super(Token);
	}
}

export default TokenRepository;
