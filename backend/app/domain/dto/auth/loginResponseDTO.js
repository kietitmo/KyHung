// app/domain/dto/loginResponseDTO.js

class LoginResponseDTO {
	constructor(accessToken, refreshToken, user) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.user = user;
	}
}

export default LoginResponseDTO;
