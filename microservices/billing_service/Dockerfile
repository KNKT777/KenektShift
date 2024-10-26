
        # Base image
        FROM node:18-alpine

        # Set working directory
        WORKDIR /app

        # Copy package files and install dependencies
        COPY package.json package-lock.json ./
        RUN npm install

        # Copy the rest of the application
        COPY . .

        # Expose port
        EXPOSE 5001

        # Start the application
        CMD ["npm", "start"]
        