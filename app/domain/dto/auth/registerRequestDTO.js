// app/domain/dto/loginRequestDTO.js

class RegisterRequestDTO {
    constructor(data) {
      this.email = data.email;
      this.password = data.password;
      this.fullName = data.fullName;
    }

    static fromRequest(data) {
      return new RegisterRequestDTO(data);
    }
  }
  
  export default RegisterRequestDTO;
  