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

  async findPairsByPuzzleId(puzzleId: string): Promise<ClueAnswerPairJSON[]> {
    return this.knexConnector(ClueAnswerModel.tableName)
      .where({ puzzleId })
      .join('clues', 'clueAnswerPairs.clueId', '=', 'clues.id')
      .join('answers', 'clueAnswerPairs.answerId', '=', 'answers.id')
      .select([
        'clues.text as clueText',
        'answers.text as answerText',
        'clueAnswerPairs.*',
      ])
  }
}
