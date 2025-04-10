import CategoryDTO from "../category/categoryDTO.js";

class ProductDTO {
	constructor(product) {
	  this.id = product._id;
	  this.name = product.name;
	  this.category = CategoryDTO.fromEntity(product.category);
	  this.price = product.price;
	  this.description = product.description;
	  this.imageUrl = product.imageUrl;
	  this.videoUrl = product.videoUrl;
	  this.createdAt = product.createdAt;
	  this.updatedAt = product.updatedAt;
	}
  
	static fromEntity(product) {
	  return new ProductDTO(product);
	}
  }
  
  export default ProductDTO;
  