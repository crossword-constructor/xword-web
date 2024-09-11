import { CreatePuzzleInput } from '../typeDefs/Puzzle'
import { KnexModel } from './KnexModel'
import { PuzzleJSON } from '../db/JSONtypes'
export class PuzzleModel extends KnexModel {
  protected static readonly tableName = 'puzzles'

  constructor() {
    super(PuzzleModel.tableName)
  }

  async findPuzzlesByMonth(month: number, year: number): Promise<PuzzleJSON[]> {
    const startDate = `${month}/1/${year}`
    const endDate = `${month}/30/${year}`
    return this.knexConnector
      .table(PuzzleModel.tableName)
      .where('date', '>=', startDate)
      .andWhere('date', '<=', endDate)
  }

  async createPuzzle(newPuzzle: CreatePuzzleInput): Promise<PuzzleJSON> {
    // convert string date to date?
    const result = await super.create(newPuzzle)
    return result as PuzzleJSON
  }
}
