# We don't want to start from scratch.
# That is why we tell node here to use the current node image as base.
FROM node:alpine3.11

# Create an application directory
RUN mkdir -p /backend

# The /app directory should act as the main application directory
WORKDIR /backend

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY back-end/package*.json ./

RUN npm ci

COPY back-end/ .

EXPOSE $PORT

CMD [ "npm", "start" ]