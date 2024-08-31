import { CreatePuzzleInput } from '../typeDefs/Puzzle'
import { KnexModel } from './KnexModel'
import { PuzzleJSON } from '../db/JSONtypes'
export class PuzzleModel extends KnexModel {
  protected static readonly tableName = 'puzzles'

  constructor() {
    super(PuzzleModel.tableName)
  }

  async createPuzzle(newPuzzle: CreatePuzzleInput): Promise<PuzzleJSON> {
    // convert string date to date?
    const result = await super.create(newPuzzle)
    return result as PuzzleJSON
  }
}
