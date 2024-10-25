# Dockerfile for KenektShift Backend

# Base image for Node
FROM node:18-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g nodemon

# Copy all source files to the container
COPY . .

# Explicitly copy GraphQL files
COPY graphql_gateway/schema.graphql graphql_gateway/resolvers.js /usr/src/app/graphql_gateway/

# Expose the port the app runs on
EXPOSE 5002

# Command to run the application
CMD ["nodemon", "server.mjs"]
