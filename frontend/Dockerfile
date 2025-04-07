# Build stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Set environment variables
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Copy the appropriate .env file
RUN if [ "$NODE_ENV" = "production" ]; then \
        cp .env.production .env; \
    else \
        cp .env.development .env; \
    fi

EXPOSE 5173
# Build the application
RUN npm run build

# The build output will be copied to the Nginx container via the shared volume
