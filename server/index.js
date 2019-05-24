import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import auth from './auth';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';
import {
  APP_PORT,
  IN_PROD,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
} from './config';

(async () => {
  try {
    await mongoose.connect('mongodb://localhost/historicalCrossword', {
      useNewUrlParser: true,
    });

    const app = express();

    app.disable('x-powered-by');

    const MongoStore = connectMongo(session);
    const store = new MongoStore({
      mongooseConnection: mongoose.connection,
      stringify: false,
    });

    app.use(
      session({
        store,
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          maxAge: parseInt(SESS_LIFETIME),
          sameSite: true,
          secure: IN_PROD,
        },
      })
    );

    // // auth(passport); // SETUP STRATEGIES ./middleware/passport
    // app.use(passport.initialize());
    // app.use(passport.session());

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
        // console.log('building context');
        return { req, res };
      },
    });
    app.use(cors());
    server.applyMiddleware({ app });
    app.listen({ port: APP_PORT }, () =>
      console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
    );
  } catch (e) {
    console.error(e);
  }
})();
