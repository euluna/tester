# Use Node.js LTS (Long Term Support) version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy all source files
COPY . .

# Set environment variables (if needed)
ENV NODE_ENV=production
ENV PORT=5500

# Expose the port your app runs on
EXPOSE ${PORT}

# Command to run the application
CMD ["npm", "start"]