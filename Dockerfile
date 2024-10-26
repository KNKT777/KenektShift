# Dockerfile for KenektShift Backend

# Build stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire source code
COPY . .

# Production stage
FROM node:18-alpine
WORKDIR /usr/src/app

# Copy necessary files from the builder stage
COPY --from=builder /usr/src/app .

# Install only production dependencies
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 5002

# Command to run the application
CMD ["node", "server.mjs"]
