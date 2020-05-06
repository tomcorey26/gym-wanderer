FROM node

WORKDIR /wanderer

COPY ./packages/server/package.json ./

RUN yarn install --production

COPY ./packages/server/dist ./dist
COPY ./packages/server/.env.prod ./.env
COPY ./ormconfig.docker.json ./ormconfig.json

RUN ls dist
RUN ls 
ENV NODE_ENV production

EXPOSE 4000 

CMD [ "node", "dist/index.js" ]