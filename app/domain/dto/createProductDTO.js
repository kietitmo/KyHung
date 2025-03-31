class CreateProductDTO {
	constructor(data) {
	  this.name = data.name;
	  this.category = data.category;
	  this.price = data.price;
	  this.description = data.description;
	  this.imageUrl = data.imageUrl;
	  this.videoUrl = data.videoUrl;
	}
  
	static fromRequest(data) {
	  return new CreateProductDTO(data);
	}
  }
  
  export default CreateProductDTO;
  