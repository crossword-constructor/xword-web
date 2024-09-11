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
import { Word, WordList } from './sequelizeModels'
import writeToDb from './scripts/writeWordListToDB';
import Knex from 'knex'

// import schemaDirectives from './directives';

import { PORT, IN_PROD, DB_URI, APP_URL, SECRET, PG_DB_NAME, PG_USERNAME, PG_PW, PG_HOST } from './config';

(async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
    });

    const knex = Knex({
      client: 'pg',
      connection: {
        host: PG_HOST,
        port: 5432,
        user: PG_USERNAME,
        password: PG_PW,
        database: PG_DB_NAME,
      }
    });
    try {
      // await sequelize.authenticate();
      // await Word.sync({ force: true })
      // await WordList.sync({ force: true })
      // console.log("writing to db")
      // writeToDb();
      // console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

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
