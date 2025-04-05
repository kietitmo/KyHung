# KyHung - Full Stack Application

A full-stack application with React frontend and Node.js backend.

## Project Structure

```
kyhung/
├── frontend/           # React frontend application
│   ├── public/         # Static files
│   ├── src/            # Source files
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   ├── store/      # Redux store
│   │   ├── utils/      # Utility functions
│   │   └── ...
│   ├── package.json    # Frontend dependencies
│   └── ...
├── backend/            # Node.js backend application
│   ├── app/            # Application code
│   │   ├── config/     # Configuration files
│   │   ├── data-access/# Data access layer
│   │   ├── domain/     # Domain models and business logic
│   │   ├── entry-points/# API routes and controllers
│   │   ├── utils/      # Utility functions
│   │   └── app.js      # Main application file
│   ├── logs/           # Application logs
│   ├── package.json    # Backend dependencies
│   └── ...
├── package.json        # Root package.json for managing both projects
└── README.md           # This file
```

## Environment Setup

### Backend Environment

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env.development
   ```

3. Update the environment variables in `.env.development` with your specific values:
   - Set up MongoDB connection string
   - Configure JWT secrets
   - Add Google OAuth credentials
   - Set up email service credentials

### Frontend Environment

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create a `.env` file with the following content:
   ```
   VITE_API_URL=http://localhost:5002/api
   ```

## Security Notes

- Never commit sensitive information like API keys, secrets, or credentials to the repository
- Keep your environment files (`.env`, `.env.development`, etc.) local and never share them
- Regularly rotate your secrets and credentials
- Use environment variables for all sensitive configuration
- Follow the principle of least privilege when setting up service accounts and API keys

## Installation

1. Install dependencies for both frontend and backend:
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

2. Start the development servers:
   ```bash
   # From the root directory
   npm run dev
   ```

This will start both the frontend and backend servers concurrently.

## Features

- User authentication (register, login, email verification)
- Product management
- User profiles
- Responsive design
- API logging and error handling

## Technologies Used

### Frontend

- React
- Redux Toolkit
- React Router
- Material UI
- Axios
- Formik & Yup

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- Nodemailer

## License

This project is licensed under the ISC License.
