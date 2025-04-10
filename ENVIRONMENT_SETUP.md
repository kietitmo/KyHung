# Environment Configuration

This project uses environment-specific configuration files to manage different settings for development, testing, and production environments. The project is structured with separate frontend and backend directories, each with their own environment configuration.

## Project Structure

```
kyhung/
├── frontend/           # React frontend application
│   ├── .env           # Frontend environment variables
│   └── ...
├── backend/            # Node.js backend application
│   ├── .env           # Default backend environment variables
│   ├── .env.development # Development environment configuration
│   ├── .env.test      # Test environment configuration
│   ├── .env.production # Production environment configuration
│   ├── .env.example   # Template file with example values
│   └── ...
└── ...
```

## Backend Environment Files

The backend includes the following environment files:

- `.env` - Default environment configuration
- `.env.development` - Development environment configuration
- `.env.test` - Test environment configuration
- `.env.production` - Production environment configuration
- `.env.example` - Template file with example values (safe to commit to version control)

## Frontend Environment Files

The frontend includes the following environment file:

- `.env` - Frontend environment variables

## Setting Up Environment Files

### Backend

1. Copy the `.env.example` file to create your environment-specific files:

```bash
cd backend
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production
```

2. Edit each file with the appropriate values for that environment.

### Frontend

1. Create a `.env` file in the frontend directory:

```bash
cd frontend
echo "VITE_API_URL=http://localhost:5002/api" > .env
```

2. Update the API URL to match your backend server's address and port.

## Running the Application with Different Environments

The application can be run with different environment configurations using the following npm scripts:

### Root Directory (for running both frontend and backend)

```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend in development mode
npm run dev

# Run only the frontend
npm run dev:frontend

# Run only the backend
npm run dev:backend
```

### Backend Directory

```bash
cd backend

# Development environment
npm run dev

# Test environment
npm run test:env

# Production environment
npm run prod
```

### Frontend Directory

```bash
cd frontend

# Development mode
npm run dev

# Build for production
npm run build
```

## Environment Variables

### Backend Environment Variables

The following environment variables are used in the backend application:

#### Application Configuration

- `APP_HOSTNAME` - The hostname of the application
- `PORT` - The port on which the application will run
- `MONGODB_URI` - The MongoDB connection URI
- `JWT_SECRET` - Secret key for JWT token generation
- `JWT_SECRET_EXPIRE_TIME` - Expiration time for JWT tokens
- `JWT_REFRESH_SECRET` - Secret key for JWT refresh tokens
- `JWT_REFRESH_SECRET_EXPIRE_TIME` - Expiration time for JWT refresh tokens
- `SALT_JWT` - Salt rounds for JWT token generation

#### Validation Regular Expressions

- `URL_REGEXP` - Regular expression for URL validation
- `FULL_NAME_REGEXP` - Regular expression for full name validation
- `PASSWORD_REGEXP` - Regular expression for password validation
- `PASSWORD_MIN_LENGTH` - Minimum length for passwords

#### Google OAuth Configuration

- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - Google OAuth callback URL

#### Email Configuration

- `MAIL_SERVICE` - Email service provider
- `MAIL_USER` - Email username
- `MAIL_PASSWORD` - Email password

#### Gmail OAuth Configuration

- `GMAIL_USERNAME` - Gmail username
- `OAUTH_CLIENT_ID` - OAuth client ID
- `OAUTH_CLIENT_SECRET` - OAuth client secret
- `OAUTH_REFRESH_TOKEN` - OAuth refresh token
- `OAUTH_ACCESS_TOKEN` - OAuth access token

#### Node Environment

- `NODE_ENV` - Node environment (development, test, production)
- `EMAIL_HOST` - Email host
- `EMAIL_PORT` - Email port
- `EMAIL_USER` - Email user
- `EMAIL_PASS` - Email password

#### Environment-specific Settings

- `LOG_LEVEL` - Logging level (debug, info, warn, error)
- `CORS_ORIGIN` - CORS origin

### Frontend Environment Variables

The following environment variables are used in the frontend application:

- `VITE_API_URL` - The URL of the backend API (e.g., http://localhost:5002/api)

## Configuration Validation

The backend application validates all environment variables using Joi schema validation. If any required variables are missing or have invalid values, the application will log an error and, in production mode, will exit the process.

## Troubleshooting

If you encounter issues with the environment configuration:

1. Make sure all required environment variables are set correctly
2. Check that the frontend API URL matches the backend server's address and port
3. Ensure that the MongoDB server is running and accessible
4. Check the logs for any error messages related to environment configuration
