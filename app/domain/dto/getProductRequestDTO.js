// getProductRequestDTO.js
class GetProductRequestDTO {
	static fromRequest(data) {
		return {
			filter: data.filter || {},
			limit: data.limit || 10,
			page: data.page || 1,
		};
	}
}

export default GetProductRequestDTO;
