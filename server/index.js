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
import schemaDirectives from './directives';
import dotenv from 'dotenv';
import {
  APP_PORT,
  IN_PROD,
  // DB_USERNAME,
  // DB_PASSWORD,
  // DB_HOST,
  // DB_PORT,
  // DB_NAME,
} from './config';

(async () => {
  dotenv.config();
  const { NODE_ENV, PROD_DB, DEV_DB } = process.env;
  try {
    console.log(NODE_ENV, PROD_DB, PORT);
    await mongoose.connect(
      'mongodb://okputadora:bwv1064rdmajor@mongodb-3855-0.cloudclusters.net:10011/crossword-web?authSource=admin',
      {
        useNewUrlParser: true,
      }
    );
    // mongoose.set('debug', true);
    const app = express();

    // app.disable('x-powered-by');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground:
        NODE_ENV === 'production'
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

    if (NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '/client/build')));
      app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
      });
    }

    server.applyMiddleware({ app });

    app.listen({ port: PORT || 4000 }, () =>
      console.log(`http://localhost:${PORT || 4000}${server.graphqlPath}`)
    );
  } catch (e) {
    console.error(e);
  }
})();
