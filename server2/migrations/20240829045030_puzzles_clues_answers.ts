import type { Knex } from 'knex'
import { createId } from '../src/db/migrationUtils'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('clues', (table) => {
    createId(table, knex)
    table.string('text').unique()
  })
  await knex.schema.createTable('answers', (table) => {
    createId(table, knex)
    table.string('text').unique()
  })
  await knex.schema.createTable('authors', (table) => {
    createId(table, knex)
    table.string('name')
  })
  await knex.schema.createTable('puzzles', (table) => {
    createId(table, knex)
    table.string('editor')
    table.string('title')
    table.uuid('authorId').references('id').inTable('authors')
    table.string('publisher')
    table.json('board')
    table.date('date')
    table.integer('width')
    table
      .enum('privacySetting', [
        'PUBLIC',
        'PRIVATE',
        'FRIENDS',
        'LINK',
        'ADMIN_ONLY',
      ])
      .defaultTo('PRIVATE')
  })
  await knex.schema.createTable('clueAnswerPairs', (table) => {
    createId(table, knex)
    table.uuid('clueId').references('id').inTable('clues')
    table.uuid('answerId').references('id').inTable('answers')
    table.uuid('puzzleId').references('id').inTable('puzzles')
    table.string('position').notNullable()
    table.unique(['clueId', 'answerId', 'puzzleId', 'position'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('clueAnswerPairs')
  await knex.schema.dropTableIfExists('puzzles')
  await knex.schema.dropTableIfExists('clues')
  await knex.schema.dropTableIfExists('answers')
  await knex.schema.dropTableIfExists('authors')
}
