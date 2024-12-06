# Use Node.js LTS (Long Term Support) version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Set environment variables (if needed)
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 5500

# Command to run the application
CMD ["npm", "start"]