# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install
COPY . .

#start the front end in dev
CMD ["npm", "run", "build"]
# 
# Start the frontend in development mode
# CMD ["npm", "run", "build"]

