class ResetPasswordRequestDTO {
	constructor(newPassword) {
		this.newPassword = newPassword;
	}

	static fromRequest(data) {
		return new ResetPasswordRequestDTO(data.newPassword);
	}
}

export default ResetPasswordRequestDTO;
