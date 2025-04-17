import UserDTO from '../../../user/dto/response/userDTO.js';
import ProductDTO from '../../../product/dto/response/productDTO.js';

class FavoriteDTO {
	constructor(favorite) {
		this.product = ProductDTO.fromEntity(favorite.product);
		this.user = UserDTO.fromEntity(favorite.user);
		this.quantity = favorite.quantity;
		this.note = favorite.note;
	}

	static fromEntity(favorite) {
		return new FavoriteDTO(favorite);
	}
}

export default FavoriteDTO;
