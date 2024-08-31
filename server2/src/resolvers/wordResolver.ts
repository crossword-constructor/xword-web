import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql'
import { PlayablePuzzleInput, PuzzlesResponse } from '../typeDefs/Puzzle'
import { Word } from '../typeDefs/WordList'
import { UserPuzzle } from '../typeDefs/UserPuzzle'
import { Puzzle } from '../typeDefs/Puzzle'
import { IGraphQLContext } from '../types/types'
import { generateResponse } from '../utils/response'
import { WordModel } from '../models/WordModel'

@Resolver()
export class WordResolver {
  constructor() {}
  @Query(() => [Word])
  async findMatchingWords(
    @Arg('search') search: string
  ): Promise<Word[] | null> {
    const wordModel = new WordModel()
    const result = await wordModel.findMatchingWords(search)
    return result
  }
}
