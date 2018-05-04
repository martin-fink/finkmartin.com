FROM node:9.3.0-alpine

LABEL maintainer="martin@finkmartin.com"

EXPOSE 10000

WORKDIR /app

COPY . /app

RUN yarn

RUN yarn grunt

CMD ["node", "app.js"]
