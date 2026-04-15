FROM node:22.22.2

COPY . /reja
WORKDIR /reja
CMD npm install && node server.js