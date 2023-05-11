# Base image
FROM node:19-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY yarn.lock package.json ./
# Install dependencies
RUN yarn install

COPY tsconfig.json tsconfig.node.json vite.config.ts index.html .eslintrc.js ./
COPY src src
COPY public public

RUN npm install -g http-server

# Build the Vue.js project
RUN yarn build

ARG API_BASE_URL='http://127.0.0.1:3333'
ENV VITE_API_BASE_URL $API_BASE_URL

EXPOSE 3000
CMD [ "http-server", "dist", "-p", "3000", "--proxy", "http://127.0.0.1:3000?" ]