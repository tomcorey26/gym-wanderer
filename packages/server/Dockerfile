FROM node

WORKDIR /usr/wanderer

COPY ./package.json ./

RUN yarn install --production

COPY ./dist ./dist
COPY ./.env.prod ./.env

ENV NODE_ENV production

EXPOSE 4000

CMD [ "node", "dist/index.js" ]
