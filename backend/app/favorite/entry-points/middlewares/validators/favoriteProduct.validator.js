import CustomError from '../../../../common/custom/error/customError.js';
import { errorCode as userCode } from '../../../../user/common/constants/userResponseCode.js';
import { errorCode as productCode } from '../../../../product/common/constants/productResponseCode.js';

import env from '../../../../common/config/env.js';
import Roles from '../../../../user/domain/models/role.enum.js';

const validateFavoriteProduct = (req, res, next) => {
	const { email, productId } = req.body;

	if (!email || !env.EMAIL_REGEXP.test(email)) {
		throw new CustomError(userCode.USER_EMAIL_INVALID);
	}

	if (!productId || typeof productId !== 'string') {
		throw new CustomError(productCode.PRODUCT_BAD_REQUEST);
	}

	if ((email !== req.user.email) & (req.user.role === Roles.USER)) {
		throw new CustomError(userCode.FORBIDDEN);
	}

	next();
};

export { validateFavoriteProduct };
