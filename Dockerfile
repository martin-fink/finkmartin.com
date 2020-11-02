FROM node:13-alpine

WORKDIR /app

COPY dist /app/dist/
COPY node_modules /app/node_modules/

EXPOSE 10000

CMD ["node", "dist/app.js"]
