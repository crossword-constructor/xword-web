// Update with your config settings.

const dotenv = require('dotenv')
dotenv.config()
const { PORT, IN_PROD, DB_URI, APP_URL, SECRET, PG_DB_NAME, PG_USERNAME, PG_PW, PG_HOST } = process.env;
console.log(process.env)
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

console.log( {PG_PW})
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '4011',
      database: 'wordlists',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
