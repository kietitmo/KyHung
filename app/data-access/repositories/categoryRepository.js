import Category from '../../domain/models/category.js';
import BaseRepository from './baseRepository.js'; // Import BaseRepository

class CategoryRepository extends BaseRepository {
	constructor() {
		super(Category);
	}
}


export default CategoryRepository;
