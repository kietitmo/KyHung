import Product from '../../domain/models/product.js';
import BaseRepository from './baseRepository.js';

class ProductRepository extends BaseRepository {
	constructor() {
		super(Product);
	}
}

export default ProductRepository;
