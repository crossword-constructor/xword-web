import { KnexModel } from './KnexModel'
import { AnswerJSON } from '../db/JSONtypes'
export class AnswerModel extends KnexModel {
  protected static readonly tableName = 'answers'

  constructor() {
    super(AnswerModel.tableName)
  }

  async findAnswerByText(text: string): Promise<AnswerJSON> {
    const result = await super.findOne<AnswerJSON>({ text })
    return result
  }

  async createAnswer(text: string): Promise<AnswerJSON> {
    const result = await super.create({ text })
    return result as AnswerJSON
  }

  async bulkCreateAnswers(answers: string[]): Promise<AnswerJSON[]> {
    const results = await super.bulkCreate(answers)
    return results as AnswerJSON[]
  }
}
