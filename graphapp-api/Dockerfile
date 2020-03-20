FROM node:8-alpine

# Create secrets directory
RUN mkdir -p /usr/src/secrets

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./graphapp-api/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./secrets/*.json /usr/src/secrets/
COPY ./graphapp-api/. .

EXPOSE 9000
CMD [ "npm", "start" ]