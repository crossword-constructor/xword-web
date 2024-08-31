import { ClueAnswerPairJSON } from '../db/JSONtypes'
import { KnexModel } from './KnexModel'

export class ClueAnswerModel extends KnexModel {
  protected static readonly tableName = 'clueAnswerPairs'

  constructor() {
    super(ClueAnswerModel.tableName)
  }

  async createClueAnswerPair(
    clueAnswerPair: ClueAnswerPairJSON
  ): Promise<ClueAnswerPairJSON> {
    const result = await super.create(clueAnswerPair)
    return result as ClueAnswerPairJSON
  }

  async bulkCreateClueAnswerPair(
    clueAnswerPairs: ClueAnswerPairJSON[]
  ): Promise<ClueAnswerPairJSON[]> {
    const results = await super.bulkCreate(clueAnswerPairs)
    return results as ClueAnswerPairJSON[]
  }
}
