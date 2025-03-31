import Category from '../../domain/models/category.js';
import BaseRepository from './baseRepository.js';

class CategoryRepository extends BaseRepository {
	constructor() {
		super(Category);
	}
}

export default CategoryRepository;
