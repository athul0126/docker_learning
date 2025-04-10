# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install
COPY . .

# Expose port for React dev server
EXPOSE 5000

# Start the frontend in development mode
CMD ["npm", "start"]