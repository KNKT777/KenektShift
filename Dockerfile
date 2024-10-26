# Dockerfile for KenektShift Backend

# Build stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Production stage
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
RUN npm install -g nodemon
RUN mkdir -p /usr/src/app/graphql_gateway
COPY graphql_gateway/schema.graphql graphql_gateway/resolvers.js /usr/src/app/graphql_gateway/
# Remove COPY for .env here

# Expose the port the app runs on
EXPOSE 5002

# Command to run the application
CMD ["nodemon", "server.mjs"]
