import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import UserService from '../domain/services/user.service.js';
import env from './env.js';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: env.JWT_SECRET,
};

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
  	},
	async (accessToken, refreshToken, profile, done) => {
		try {
			const userService = new UserService()
			let user = await userService.getUserByEmail(profile.emails[0].value);
			
			if (user) {
				return done(null, user);
			} else {
				const user = {
					email: profile.emails[0].value,
					fullName: profile.displayName
				}

				const newUser = await userService.createUser(user);
				
				return done(null, newUser);
			}
		} catch (err) {
			return done(err, null);
		}
	}
));

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
