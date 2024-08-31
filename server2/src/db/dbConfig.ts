import KnexConnector, { Knex } from 'knex'
import { PG_HOST, PG_USERNAME, PG_PW, PG_DB_NAME } from '../config'

const knex = KnexConnector({
  client: 'pg',
  connection: {
    host: PG_HOST,
    port: 5432,
    user: PG_USERNAME,
    password: PG_PW,
    database: PG_DB_NAME,
  },
})
export class DatabaseConfig {
  public static instance: DatabaseConfig

  private _knex: Knex

  constructor(knexInstance: Knex) {
    this._knex = knexInstance
  }

  get knex() {
    return this._knex
  }
}

export const getDatabaseConfig = () => {
  if (DatabaseConfig.instance) {
    return DatabaseConfig.instance
  }
  const databaseConfig = new DatabaseConfig(knex)
  DatabaseConfig.instance = databaseConfig
  return DatabaseConfig.instance
}
