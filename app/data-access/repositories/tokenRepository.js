import Token from '../../domain/models/token.js';
import BaseRepository from './baseRepository.js';

class TokenRepository extends BaseRepository {
	constructor() {
		super(Token);
	}
}

export default TokenRepository;
