import express from 'express'
import path from 'path'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import 'reflect-metadata'
import { buildTypeDefsAndResolvers } from 'type-graphql'
// import auth from './auth';
import jwt from 'jsonwebtoken'
import typeDefs from './typeDefs'
import resolverClasses from './resolvers'
import { makeExecutableSchema } from '@graphql-tools/schema'

// import { Word, WordList } from './sequelizeModels'
// import writeToDb from './scripts/writeWordListToDB';
import Knex from 'knex'

// import schemaDirectives from './directives';

import {
  PORT,
  IN_PROD,
  DB_URI,
  APP_URL,
  SECRET,
  PG_DB_NAME,
  PG_USERNAME,
  PG_PW,
  PG_HOST,
} from './config'
import { getDatabaseConfig } from './db/dbConfig'
;(async () => {
  try {
    // await mongoose.connect(DB_URI, {
    //   useNewUrlParser: true,
    // });

    getDatabaseConfig()
    try {
      // await sequelize.authenticate();
      // await Word.sync({ force: true })
      // await WordList.sync({ force: true })
      // console.log("writing to db")
      // writeToDb();
      // console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }

    const app = express()

    app.disable('x-powered-by')

    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
      resolvers: resolverClasses,
    })
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // playground: IN_PROD
      //   ? false
      //   : {
      //       settings: {
      //         'request.credentials': 'include',
      //       },
      //     },
      context: ({ req, res }: any) => {
        res.set('Access-Control-Allow-Origin', '*')
        const { user } = req.cookies
        if (user) {
          try {
            req.user = jwt.verify(user, SECRET)
          } catch (e) {
            console.log('ERORR: ', e)
          }
        }
        return { req, res, user }
      },
    })

    // app.use(
    //   cors({
    //     origin: APP_URL,
    //     credentials: true,
    //   })
    // )
    app.use(
      '/graphql',
      cors<cors.CorsRequest>({
        origin: [
          'https://www.your-app.example',
          'https://studio.apollographql.com', // Remove in prod
        ],
        credentials: true,
      }),
      express.json()
      // expressMiddleware(server)
    )

    app.use(cookieParser())

    if (IN_PROD) {
      app.use(express.static(path.join(__dirname, '../client/build')))
      app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
      })
    }
    await server.start()
    server.applyMiddleware({ app })
    app.listen({ port: PORT }, () => console.log(`server ready at ${PORT}`))
  } catch (e) {
    console.error(e)
  }
})()
