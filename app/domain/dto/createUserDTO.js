class CreateUserDTO {
	constructor(fullName, email, password) {
		this.fullName = fullName;
		this.email = email;
		this.password = password;
	}

	// Hàm static để tạo từ dữ liệu client
	static fromRequest(requestData) {
		return new CreateUserDTO(
			requestData.fullName,
			requestData.email,
			requestData.password
		);
	}

	// Bạn có thể thêm validation ở đây nếu cần
	static validate(requestData) {
		const errors = [];
		if (!requestData.fullName) errors.push('fullName is required');
		if (!requestData.email) errors.push('Email is required');
		if (!requestData.password) errors.push('Password is required');
		return errors;
	}
}

export default CreateUserDTO;
