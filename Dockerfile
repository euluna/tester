# Use Node.js LTS (Long Term Support) version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and config first
COPY package*.json ./
COPY jest.config.js ./

# Install ALL dependencies (including dev dependencies for testing)
RUN npm ci
RUN npm install -g jest

# Copy all source files
# This includes test directories and all other files
COPY . .

# Set environment variables
ENV NODE_ENV=test
ENV PORT=5500

# Expose the port your app runs on
EXPOSE ${PORT}

# Command to run the application
CMD ["npm", "start"]