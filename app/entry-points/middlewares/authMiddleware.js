import passport from 'passport';

export const verifyAccessToken = passport.authenticate('jwt', {
	session: false,
});
