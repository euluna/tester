# Use Node.js LTS (Long Term Support) version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for testing)
RUN npm ci

# Copy all source files
COPY . .

# Set environment variables (if needed)
ENV NODE_ENV=production
ENV PORT=5500

# Expose the port your app runs on
EXPOSE ${PORT}

# Command to run the application
CMD ["npm", "start"]