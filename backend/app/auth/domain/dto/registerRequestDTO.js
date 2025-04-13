// app/domain/dto/loginRequestDTO.js

class RegisterRequestDTO {
	constructor(data) {
		this.email = data.email;
		this.password = data.password;
		this.fullName = data.fullName;
		this.phoneNumber = data.phoneNumber || null;
		this.address = data.address || null;
		this.city = data.city || null;
		this.country = data.country || null;
		this.gender = data.gender || null;
	}

	static fromRequest(data) {
		return new RegisterRequestDTO(data);
	}
}

export default RegisterRequestDTO;
