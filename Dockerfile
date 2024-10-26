# Stage 1 - Builder Stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --include=dev --legacy-peer-deps

# Copy the entire application code
COPY . .

# Stage 2 - Production Stage
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy node_modules and application code from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app .

# Install nodemon (Development dependency) removed for production
# Install required packages for production
RUN npm install -g

# Expose the port the app runs on
EXPOSE 5002

# Use node to run the application
CMD ["node", "server.mjs"]
