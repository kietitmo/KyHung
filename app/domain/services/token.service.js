// import TokenRepository from '../../data-access/repositories/tokenRepository.js';
// import { errorCode } from '../../utils/authResponseCode.js';
// import CustomError from '../custom/customError.js';

// class TokenService {
// 	constructor() {
// 		this.tokenRepository = new TokenRepository();
// 	}
	
// 	async createToken(tokenData) {
// 		const tokenInstance = await this.tokenRepository.findOne({ tokenValue: tokenData.tokenValue });
// 		if (tokenInstance) {
// 			throw new CustomError(errorCode.INVALID_TOKEN);
// 		}

// 		return this.tokenRepository.create(tokenData);
// 	}

// 	async getToken(token) {
// 		const tokenInstance = await this.tokenRepository.findOne({ tokenValue: token });
// 		console.log(token, tokenInstance)
// 		if (!tokenInstance) {
// 			throw new CustomError(errorCode.VERIFY_TOKEN_NOT_FOUND);
// 		}
// 		return tokenInstance;
// 	}

// 	async deleteToken(token) {
// 		const tokenData = await this.tokenRepository.findOne({ tokenValue: token });
// 		if (!tokenData) {
// 			throw new CustomError(errorCode.VERIFY_TOKEN_NOT_FOUND);
// 		}
// 		return this.tokenRepository.delete({ tokenValue: token });
// 	}
// }

// export default TokenService;
