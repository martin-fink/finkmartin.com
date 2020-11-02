FROM node:13-alpine

WORKDIR /app

ADD dist /app/dist/
ADD node_modules /app/node_modules/

EXPOSE 10000

CMD ["node", "dist/app.js"]
