class ResetPasswordRequestDTO {
  constructor(token, newPassword) {
    this.token = token;
    this.newPassword = newPassword;
  }

  static fromRequest(data) {
    return new ResetPasswordRequestDTO(data.token, data.newPassword);
  }
}

export default ResetPasswordRequestDTO; 