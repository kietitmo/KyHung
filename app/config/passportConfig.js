import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import dotenv from 'dotenv';
import UserService from '../domain/services/user.service.js';
import Config from './config.js';

dotenv.config();

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: Config.JWT_SECRET,
};

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENT_ID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
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

				const newUser = new userService.createUser(user);
				
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
