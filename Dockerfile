# Dockerfile for KenektShift Backend

# Stage 1: Builder Stage for building the application
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install all dependencies including development dependencies with --legacy-peer-deps to avoid conflicts
RUN npm install --include=dev --legacy-peer-deps

# Copy all the source code into the container
COPY . .

# Stage 2: Production Stage for serving the application
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy over the node_modules from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copy over all the code
COPY --from=builder /usr/src/app .

# Install nodemon globally
RUN npm install -g nodemon

# Create necessary directories for GraphQL
RUN mkdir -p /usr/src/app/graphql_gateway

# Copy GraphQL files into the container
COPY graphql_gateway/schema.graphql graphql_gateway/resolvers.js /usr/src/app/graphql_gateway/

# Expose the port the app runs on
EXPOSE 5002

# Run the application with nodemon
CMD ["nodemon", "server.mjs"]
