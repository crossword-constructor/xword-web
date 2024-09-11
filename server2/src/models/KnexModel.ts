import knex, { Knex } from 'knex'
import { getDatabaseConfig } from '../db/dbConfig'
import { OrderBy } from '../db/JSONtypes'

const databaseConfig = getDatabaseConfig()
export class KnexModel {
  private tableName: string

  protected knexConnector: Knex

  constructor(tableName: string) {
    this.tableName = tableName
    this.knexConnector = databaseConfig.knex
  }

  public findOne<T>(where: Record<string, any>): Promise<T> {
    return this.knexConnector(this.tableName).where(where).first()
  }

  public findAll<T>(where: Record<string, any>): Promise<T[]> {
    return this.knexConnector(this.tableName).where(where) //.select() ?
  }

  public findById<T>(id: string): Promise<T> {
    return this.knexConnector(this.tableName).where({ id }).first()
  }

  // public findAll<T>(whereValue) {}

  public findLike<T>(
    field: string,
    value: string,
    limit: number,
    orderBy?: OrderBy
  ): Promise<T[]> {
    let query = this.knexConnector(this.tableName)
      .where(field, 'like', value)
      .limit(limit)
    if (orderBy) {
      query = query.orderBy(orderBy.field, orderBy.direction)
    }
    return query
  }

  public async create<T>(data: T): Promise<Record<string, any>> {
    const result = await this.knexConnector(this.tableName)
      .insert(data)
      .returning('id')
    return this.findById(result[0].id)
  }

  public bulkCreate<T>(data: T[]): Promise<Record<string, any>> {
    return this.knexConnector(this.tableName).insert(data)
  }
}
