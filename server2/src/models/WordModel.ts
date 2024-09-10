import { Word } from '../typeDefs/WordList'
import { KnexModel } from './KnexModel'
import { WordJSON, SortDirection } from '../db/JSONtypes'
export class WordModel extends KnexModel {
  protected static readonly tableName = 'words'

  constructor() {
    super(WordModel.tableName)
  }

  async findMatchingWords(search: string): Promise<Word[] | null> {
    console.log({ findingMatchingWordsFor: search })
    try {
      const sanitizedSearchString = search // @TODO Sanitize input string
      const words = await this.findLike<WordJSON>(
        'text',
        sanitizedSearchString,
        20,
        { field: 'score', direction: SortDirection.DESCENDING }
      )
      console.log({ words })
      return words.map((word: WordJSON) => this.convertJSONToGQL(word))
    } catch (err) {
      console.log({ err })
      return null
    }
  }

  private convertJSONToGQL(json: WordJSON): Word {
    return {
      ...json,
    } as Word
  }
}
