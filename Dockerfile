# Use an official Node.js runtime as a parent image
FROM node:19-alpine as build-stage

# Set the working directory to /app
WORKDIR /app

ARG VITE_API_BASE_URL='http://172.18.20.12:3333'

# Copy package.json and package-lock.json to the container
COPY yarn.lock package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js app
RUN yarn build

# Production stage
FROM nginx:stable-alpine as production-stage

# Copy the built Vue.js app from the build stage to the NGINX container
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
