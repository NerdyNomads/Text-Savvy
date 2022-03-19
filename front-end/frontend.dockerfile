# Pull from a base image
FROM node:12-alpine

# Create an application directory
RUN mkdir -p /front-end

# Set WORKDIR to front end
WORKDIR /front-end

# Copy the app package and package-lock.json files
COPY front-end/package*.json ./

# Install dependencies
RUN npm ci

# Copy the project directory into the directory of docker image
COPY front-end/ .

# Expose the port 3000
EXPOSE 3000

ENV PROXY_API=$PROXY_API

# Start App
CMD ["npm", "start"]