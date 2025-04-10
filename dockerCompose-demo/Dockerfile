# Use official Node.js LTS Alpine image
FROM node:18-alpine

# Set environment variables
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json separately (better for caching)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
