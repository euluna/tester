# Step 1: Set up a simple HTTP server
FROM node:16 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build  # Optional if you have build scripts

# Step 2: Serve the files using a basic HTTP server (e.g., http-server)
FROM node:16
WORKDIR /usr/share/nginx/html
COPY --from=builder /app .

EXPOSE 8080
CMD ["npx", "http-server", "-p", "8080"]