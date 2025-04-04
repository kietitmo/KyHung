class ForgotPasswordRequestDTO {
  constructor(email) {
    this.email = email;
  }

  static fromRequest(data) {
    return new ForgotPasswordRequestDTO(data.email);
  }
}

export default ForgotPasswordRequestDTO; 