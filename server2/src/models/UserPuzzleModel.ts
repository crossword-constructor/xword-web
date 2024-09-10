import { CreatePuzzleInput } from '../typeDefs/Puzzle'
import { KnexModel } from './KnexModel'
import { UserPuzzleJSON, CellJSON } from '../db/JSONtypes'
export class UserPuzzleModel extends KnexModel {
  protected static readonly tableName = 'userPuzzles'

  constructor() {
    super(UserPuzzleModel.tableName)
  }

  async createUserPuzzle(
    puzzleId: string,
    userId: string,
    board: CellJSON[]
  ): Promise<UserPuzzleJSON> {
    // convert string date to date?
    const result = await super.create({
      puzzleId,
      userId,
      board: JSON.stringify(board.map((cell) => ({ guess: '' }))),
    })
    return result as UserPuzzleJSON
  }

  async findOrCreate(
    puzzleId: string,
    userId: string,
    board: CellJSON[]
  ): Promise<UserPuzzleJSON> {
    const existingUserPuzzle = await super.findOne<UserPuzzleJSON>({
      puzzleId,
      userId,
    })
    if (existingUserPuzzle) {
      return existingUserPuzzle
    }
    const newPuzzle = await this.createUserPuzzle(puzzleId, userId, board)
    return newPuzzle
  }
}
