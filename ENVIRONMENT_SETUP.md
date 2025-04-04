# Environment Configuration

This project uses environment-specific configuration files to manage different settings for development, testing, and production environments.

## Environment Files

The project includes the following environment files:

- `.env.development` - Development environment configuration
- `.env.test` - Test environment configuration
- `.env.production` - Production environment configuration
- `.env.example` - Template file with example values (safe to commit to version control)

## Setting Up Environment Files

1. Copy the `.env.example` file to create your environment-specific files:

```bash
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production
```

2. Edit each file with the appropriate values for that environment.

## Running the Application with Different Environments

The application can be run with different environment configurations using the following npm scripts:

```bash
# Development environment
npm run dev

# Test environment
npm run test:env

# Production environment
npm run prod
```

## Environment Variables

The following environment variables are used in the application:

### Application Configuration
- `APP_HOSTNAME` - The hostname of the application
- `PORT` - The port on which the application will run
- `MONGODB_URI` - The MongoDB connection URI
- `JWT_SECRET` - Secret key for JWT token generation
- `JWT_SECRET_EXPIRE_TIME` - Expiration time for JWT tokens
- `JWT_REFRESH_SECRET` - Secret key for JWT refresh tokens
- `JWT_REFRESH_SECRET_EXPIRE_TIME` - Expiration time for JWT refresh tokens
- `SALT_JWT` - Salt rounds for JWT token generation

### Validation Regular Expressions
- `URL_REGEXP` - Regular expression for URL validation
- `FULL_NAME_REGEXP` - Regular expression for full name validation
- `PASSWORD_REGEXP` - Regular expression for password validation
- `PASSWORD_MIN_LENGTH` - Minimum length for passwords

### Google OAuth Configuration
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - Google OAuth callback URL

### Email Configuration
- `MAIL_SERVICE` - Email service provider
- `MAIL_USER` - Email username
- `MAIL_PASSWORD` - Email password

### Gmail OAuth Configuration
- `GMAIL_USERNAME` - Gmail username
- `OAUTH_CLIENT_ID` - OAuth client ID
- `OAUTH_CLIENT_SECRET` - OAuth client secret
- `OAUTH_REFRESH_TOKEN` - OAuth refresh token
- `OAUTH_ACCESS_TOKEN` - OAuth access token

### Node Environment
- `NODE_ENV` - Node environment (development, test, production)
- `EMAIL_HOST` - Email host
- `EMAIL_PORT` - Email port
- `EMAIL_USER` - Email user
- `EMAIL_PASS` - Email password

### Environment-specific Settings
- `LOG_LEVEL` - Logging level (debug, info, warn, error)
- `CORS_ORIGIN` - CORS origin

## Configuration Validation

The application validates all environment variables using Joi schema validation. If any required variables are missing or have invalid values, the application will log an error and, in production mode, will exit the process.

## Security Considerations

- Never commit the actual environment files (`.env.development`, `.env.test`, `.env.production`) to version control
- Only commit the `.env.example` file as a template
- Use strong, unique values for secrets in production
- Consider using a secrets management service for production environments 