import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { refreshToken } from './refreshToken';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserResolver } from './resolvers/UserResolver';
import { GymResolver } from './resolvers/GymResolver';
import { MembershipResolver } from './resolvers/MembershipResolver';
import { ReviewResolver } from './resolvers/ReviewResolver';
import { AlertResolver } from './resolvers/AlertResolver';
import { createtypeormConnection } from './createtypeormConnection';
import helmet from 'helmet';

//lambda function (it calls itself!)
(async () => {
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(cookieParser());
  app.get('/', (_req, res) => res.send('yo'));
  app.post('/refresh_token', refreshToken);

  await createtypeormConnection();

  const apolloServer = new ApolloServer({
    introspection: true,
    playground: true,
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        GymResolver,
        MembershipResolver,
        ReviewResolver,
        AlertResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log('express server started');
  });
})();
