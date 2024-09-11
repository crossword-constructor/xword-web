import { PuzzleResolver } from './puzzleResolver'
import { WordResolver } from './wordResolver'
import { ScrapeResolver } from './scrape'
import { UserResolver } from './userResolver'

export default [
  PuzzleResolver,
  WordResolver,
  ScrapeResolver,
  UserResolver,
] as const
