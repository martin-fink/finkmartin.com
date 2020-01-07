FROM node:13-alpine as stage-build

LABEL maintainer="martin@finkmartin.com"

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY src/ /app/src
COPY gruntfile.js /app

RUN yarn build

RUN yarn install --production --frozen-lockfile

FROM node:13-alpine

WORKDIR /app

COPY --from=stage-build /app/dist /app/node_modules /app/dist/
COPY --from=stage-build /app/node_modules /app/node_modules/

EXPOSE 10000

CMD ["node", "dist/app.js"]
