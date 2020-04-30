import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { refreshToken } from './refreshToken';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserResolver } from './resolvers/UserResolver';
import { GymResolver } from './resolvers/GymResolver';
import { MembershipResolver } from './resolvers/MembershipResolver';
import { ReviewResolver } from './resolvers/ReviewResolver';

//lambda function (it calls itself!)
(async () => {
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.get('/', (_req, res) => res.send('yo'));
  app.post('/refresh_token', refreshToken);
  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        GymResolver,
        MembershipResolver,
        ReviewResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('express server started');
  });
})();
