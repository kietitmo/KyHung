import Product from '../../domain/models/product.model.js';
import BaseRepository from './baseRepository.js';

class ProductRepository extends BaseRepository {
	constructor() {
		super(Product);
	}
}

export default ProductRepository;
