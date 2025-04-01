// validator chi co admin hoac ban than user moi them san pham yeu thich dc
// validator cho chinh ta cua mail
import CustomError from '../../../domain/custom/customError.js';
import { errorCode as userCode } from '../../../utils/userResponseCode.js';
import { errorCode as productCode } from '../../../utils/productResponseCode.js';

import Config from '../../../config/config.js';
import Roles from '../../../domain/models/role.enum.js'

const validateFavoriteProduct = (req, res, next) => {
	const { email, productId } = req.body;

	if (!email || !Config.EMAIL_REGEXP.test(email)) {
		throw new CustomError(userCode.USER_EMAIL_INVALID);
	}

    if (!productId || typeof productId !== "string") {
		throw new CustomError(productCode.PRODUCT_BAD_REQUEST);
	}

    if (email !== req.user.email & req.user.role === Roles.USER){
        throw new CustomError(userCode.FORBIDDEN);
    }

	next();
};

export { validateFavoriteProduct };