import Category from '../domain/models/category.model.js';
import BaseRepository from '../../common/base/baseRepository.js';

class CategoryRepository extends BaseRepository {
	constructor() {
		super(Category);
	}
}

export default CategoryRepository;
