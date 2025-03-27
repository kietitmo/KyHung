// app/domain/dto/loginResponseDTO.js

class LoginResponseDTO {
	constructor(accessToken, refreshToken) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
}

export default LoginResponseDTO;
