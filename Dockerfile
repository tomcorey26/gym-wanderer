FROM node

WORKDIR /wanderer

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server
COPY ./packages/controllers/package.json ./packages/controllers

RUN npm i -g yarn
RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/controllers/build   ./packages/controllers/build
COPY ./packages/server/.env.prod ./packages/server/.env
COPY ./ormconfig.json .

WORKDIR /packages/server

ENV NODE_ENV production

EXPOSE 4000 

CMD [ "node", "dist/index.js" ]