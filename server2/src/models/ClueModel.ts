import { KnexModel } from './KnexModel'
import { ClueJSON } from '../db/JSONtypes'
export class ClueModel extends KnexModel {
  protected static readonly tableName = 'clues'

  constructor() {
    super(ClueModel.tableName)
  }

  async findClueByText(text: string): Promise<ClueJSON> {
    const result = await super.findOne<ClueJSON>({ text })
    return result
  }

  async createClue(text: string): Promise<ClueJSON> {
    const result = await super.create({ text })
    return result as ClueJSON
  }

  async bulkCreateClues(clues: string[]): Promise<ClueJSON[]> {
    const results = await super.bulkCreate(clues)
    return results as ClueJSON[]
  }
}
