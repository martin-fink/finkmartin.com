FROM node:9.3.0-alpine

LABEL maintainer="martin@finkmartin.com"

EXPOSE 10000

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

COPY src/ /app/src
COPY gruntfile.js /app

RUN yarn grunt

CMD ["node", "dist/app.js"]
