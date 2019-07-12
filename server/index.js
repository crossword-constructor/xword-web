import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
// import auth from './auth';
import jwt from 'jsonwebtoken';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
// import schemaDirectives from './directives';

import { PORT, IN_PROD, DB_URI, APP_URL, SECRET } from './config';

(async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
    });

    const app = express();

    app.disable('x-powered-by');

    const server = new ApolloServer({
      path: '/graphql',
      typeDefs,
      resolvers,
      playground: IN_PROD
        ? false
        : {
            settings: {
              'request.credentials': 'include',
            },
          },
      context: ({ req, res }) => {
        res.set('Access-Control-Allow-Origin', APP_URL);
        const { user } = req.cookies;
        if (user) {
          try {
            req.user = jwt.verify(user, SECRET);
          } catch (e) {
            console.log('ERORR: ', e);
          }
        }
        return { req, res };
      },
    });

    app.use(
      cors({
        origin: APP_URL,
        credentials: true,
      })
    );

    app.use(cookieParser());

    if (IN_PROD) {
      app.use(express.static(path.join(__dirname, '../client/build')));
      app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
      });
    }

    server.applyMiddleware({ app });
    app.listen({ port: PORT }, () => console.log(`server ready at ${PORT}`));
  } catch (e) {
    console.error(e);
  }
})();
