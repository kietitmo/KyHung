import passport from 'passport';
import CustomError from '../../domain/custom/customError.js';
import { errorCode } from '../../utils/code/userResponseCode.js';

const verifyAccessToken = passport.authenticate('jwt', {
	session: false,
});

const authorize = (roles = []) => {
	return (req, res, next) => {
		const user = req.user;

		if (!user) {
			throw new CustomError(errorCode.UNAUTHORIZED);
		}

		if (!user.isVerified) {
			throw new CustomError(errorCode.USER_NOT_VERIFIED);
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
