FROM node:9-alpine as stage-build

LABEL maintainer="martin@finkmartin.com"

EXPOSE 10000

WORKDIR /app

COPY package.json yarn.lock .

RUN yarn --frozen-lockfile

COPY src/ /app/src
COPY gruntfile.js /app

RUN yarn build

RUN yarn --production --frozen-lockfile

FROM node:9-alpine

WORKDIR /app

COPY --from=stage-build /app/dist /app/node_modules . 

CMD ["node", "dist/app.js"]
