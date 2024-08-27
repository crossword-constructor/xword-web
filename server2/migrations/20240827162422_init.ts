import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('wordLists', (table) => {
    table.increments()
    table.string('name')
  })
  return knex.schema.createTable('words', (table) => {
    table.increments()
    table.string('text')
    table.integer('score')
    table.uuid('wordListId')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('wordLists')
  return knex.schema.dropTableIfExists('words')
}
