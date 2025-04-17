import passport from 'passport';
import CustomError from '../../../common/custom/error/customError.js';
import { errorCode } from '../../../auth/common/constants/authResponseCode.js';
import { errorCode as userCode } from '../../../user/common/constants/userResponseCode.js';
import State from '../../../user/domain/models/state.enum.js';
const verifyAccessToken = passport.authenticate('jwt', {
	session: false,
});

const authorize = (roles = []) => {
	return (req, res, next) => {
		const user = req.user;

		if (!user) {
			throw new CustomError(errorCode.UNAUTHORIZED);
		}

		if (user.state !== State.ACTIVE) {
			throw new CustomError(userCode.USER_NOT_ACTIVE);
		}

		if (roles.length && !roles.includes(user.role)) {
			throw new CustomError(errorCode.FORBIDDEN);
		}

		next();
	};
};

const googleLogin = passport.authenticate('google', {
	scope: ['profile', 'email'],
});

const verifyGoogleOauth = passport.authenticate('google', {
	failureRedirect: '/login',
	session: false,
});

export { authorize, verifyAccessToken, verifyGoogleOauth, googleLogin };
