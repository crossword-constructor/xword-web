import knex, { Knex } from 'knex'
import { getDatabaseConfig } from '../db/dbConfig'
import { OrderBy } from '../db/JSONtypes'

const databaseConfig = getDatabaseConfig()
const knexConnector = databaseConfig.knex
export class KnexModel {
  private tableName: string
  // private knexConnector: Knex

  constructor(tableName: string) {
    this.tableName = tableName
  }

  public findOne<T>(where: Record<string, any>): Promise<T> {
    return knexConnector(this.tableName).where(where).first()
  }

  public findAll<T>(where: Record<string, any>): Promise<T[]> {
    return knexConnector(this.tableName).where(where) //.select() ?
  }

  public findLike<T>(
    field: string,
    value: string,
    orderBy?: OrderBy
  ): Promise<T[]> {
    let query = knexConnector(this.tableName).where(field, 'like', value)
    if (orderBy) {
      query = query.orderBy(orderBy.field, orderBy.direction)
    }
    return query
  }

  public create<T>(data: T): Promise<Record<string, any>> {
    return knexConnector(this.tableName).insert(data).select()
  }

  public bulkCreate<T>(data: T[]): Promise<Record<string, any>> {
    return knexConnector(this.tableName).insert(data)
  }
}
