import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import UserRepository from '../data-access/repositories/userRepository.js';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = await UserRepository.findByEmail(jwt_payload.email);

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
