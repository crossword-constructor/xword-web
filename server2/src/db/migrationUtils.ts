import { Knex } from 'knex'

export const createId = (table: Knex.TableBuilder, knex: Knex): void => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))
}
