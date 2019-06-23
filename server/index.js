import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
// import auth from './auth';
import jwt from 'jsonwebtoken';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';
import dotenv from 'dotenv';
import {
  APP_PORT,
  IN_PROD,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} from './config';

(async () => {
  dotenv.config();
  try {
    await mongoose.connect('mongodb://localhost/historicalCrossword', {
      useNewUrlParser: true,
    });

    const app = express();

    // app.disable('x-powered-by');

    const server = new ApolloServer({
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
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

        // consider moving this to auth
        const { user } = req.cookies;
        if (user) {
          try {
            req.user = jwt.verify(user, process.env.SECRET);
          } catch (e) {
            console.log('ERORR: ', e);
          }
        }
        // console.log(req);
        return { req, res };
      },
    });

    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
    app.use(cookieParser());
    server.applyMiddleware({ app });

    app.listen({ port: APP_PORT }, () =>
      console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
    );
  } catch (e) {
    console.error(e);
  }
})();
