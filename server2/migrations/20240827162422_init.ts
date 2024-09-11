import type { Knex } from 'knex'
import { createId } from '../src/db/migrationUtils'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await knex.schema.createTable('wordLists', (table) => {
    createId(table, knex)
    table.string('name')
  })
  return knex.schema.createTable('words', (table) => {
    createId(table, knex)
    table.string('text')
    table.integer('score')
    table.uuid('wordListId').references('id').inTable('wordLists')
    table.unique(['text', 'wordListId'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('words')
  await knex.schema.dropTableIfExists('wordLists')
}
