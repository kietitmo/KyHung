import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';
import UserService from '../domain/services/userService.js';

dotenv.config();

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const userService = new UserService();
			const user = await userService.getUserByEmail(jwt_payload.email);

			if (!user) {
				return done(null, false);
			}

			return done(null, user);
		} catch (error) {
			return done(error, false);
		}
	})
);

export default passport;
