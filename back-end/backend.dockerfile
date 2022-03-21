# Use node image as base
FROM node:alpine3.11

# Create an application directory
RUN mkdir -p /backend

# Set /backend as the working directory
WORKDIR /backend

# Copy the local back-end package.json files into the current directory of our docker image (/backend)
COPY back-end/package*.json ./

# Install node dependencies
RUN npm ci

# Copy the rest of the back-end files into the working directory
COPY back-end/ .

# Expose the port
EXPOSE $PORT

# Start the backend
CMD ["npm", "start"]