import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import env from './env.js';
import AuthService from '../../auth/domain/services/auth.service.js';
import OAuthProvider from '../../user/domain/models/oauthprovider.enum.js';
import State from '../../user/domain/models/state.enum.js';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: env.JWT_SECRET,
};

passport.use(
	new GoogleStrategy(
		{
			clientID: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			callbackURL: env.GOOGLE_CALLBACK_URL,
			scope: ['profile', 'email'],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const email = profile.emails[0].value;
				const providerId = profile.id;
				const fullName = profile.displayName;

				const authService = new AuthService();
				let user = await authService.getUserByOAuthProviderId(
					OAuthProvider.GOOGLE,
					providerId
				);

				if (user) return done(null, user);

				const existingUser = await authService.getUserByEmail(email);
				if (existingUser) {
					const mergedUser = await authService.mergeAccount(
						email,
						OAuthProvider.GOOGLE,
						providerId
					);
					return done(null, mergedUser);
				}

				user = await authService.createUser({
					fullName,
					email,
					oauth: [
						{
							provider: OAuthProvider.GOOGLE,
							providerId,
						},
					],
					state: State.ACTIVE,
				});

				return done(null, user);
			} catch (err) {
				return done(err, null);
			}
		}
	)
);

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const authService = new AuthService();
			const user = await authService.getProfile(jwt_payload.email);

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
