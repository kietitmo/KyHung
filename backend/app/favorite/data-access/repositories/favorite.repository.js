import Favorite from '../../domain/models/favorite.js';
import BaseRepository from '../../../common/base/baseRepository.js';

class FavoriteRepository extends BaseRepository {
	constructor() {
		super(Favorite);
	}
}

export default FavoriteRepository;
