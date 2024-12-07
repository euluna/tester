# Use Node.js LTS (Long Term Support) version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY jest.config.js ./

# Install ALL dependencies (including dev dependencies for testing)
RUN npm ci
RUN npm install -g jest

# Create test directory structure
RUN mkdir -p test/setup test/unit test/integration test/e2e

# Copy test setup files first
COPY test/setup ./test/setup/
COPY test/unit ./test/unit/
COPY test/integration ./test/integration/
COPY test/e2e ./test/e2e/

# Copy remaining source files
COPY . .

# Set environment variables (if needed)
ENV NODE_ENV=test
ENV PORT=5500

# Expose the port your app runs on
EXPOSE ${PORT}

# Command to run the application
CMD ["npm", "start"]