import {
  Resolver,
  Query,
  Mutation,
  Args,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql'
import {
  PlayablePuzzle,
  PlayablePuzzleInput,
  PlayablePuzzleResponse,
  PuzzlesResponse,
} from '../typeDefs/Puzzle'

import { clueAnswerPairJSONToGql } from '../utils/transformers'
import { User } from '../typeDefs/User'
import { UserPuzzle } from '../typeDefs/UserPuzzle'
import { Puzzle, GetPuzzlesByMonthArgs, ClueAnswer } from '../typeDefs/Puzzle'
import { IGraphQLContext } from '../types/types'
import { generateResponse } from '../utils/response'
import { PuzzleModel } from '../models/PuzzleModel'
import { UserPuzzleModel } from '../models/UserPuzzleModel'
import { PuzzleJSON } from '../db/JSONtypes'
import { ClueAnswerModel } from '../models/ClueAnswerModel'

@Resolver(() => Puzzle)
export class PuzzleResolver {
  constructor() {}
  @Query(() => PlayablePuzzle)
  async playablePuzzle(
    @Args() { id }: PlayablePuzzleInput,
    @Ctx() context: IGraphQLContext
  ): Promise<PlayablePuzzle> {
    const puzzleModel = new PuzzleModel()
    const puzzle = await puzzleModel.findById<PuzzleJSON>(id)
    const userPuzzleModel = new UserPuzzleModel()
    const userId = context?.user?.id
    if (!userId) {
      throw new Error('You must login to solve puzzles')
    }
    const userPuzzle = await userPuzzleModel.findOrCreate(
      id,
      userId,
      puzzle.board
    )
    return {
      puzzle,
      userPuzzle,
    }
  }

  @Query(() => [Puzzle])
  async getPuzzlesByMonth(
    @Args() { month, year }: GetPuzzlesByMonthArgs // @Ctx() { user }: IGraphQLContext
  ): Promise<Puzzle[]> {
    const puzzleModel = new PuzzleModel()
    const puzzles = await puzzleModel.findPuzzlesByMonth(month, year)
    return puzzles
    // puzzleModel.findAll({ date: })
  }

  @FieldResolver(() => [ClueAnswer])
  async clues(@Root() puzzle: Puzzle): Promise<ClueAnswer[]> {
    console.log('RESOLVING PUZZLE')
    console.log({ resolvingClues: puzzle.id })
    const clueAnswerModel = new ClueAnswerModel()
    const caPairs = await clueAnswerModel.findPairsByPuzzleId(puzzle.id)
    console.log({ caPairs })
    return caPairs.map((caPair) => clueAnswerPairJSONToGql(caPair))
  }
  // @Mutation(() => PlayablePuzzleResponse)
  // async createPuzzle(@args() puzzle: PlayablePuzzleInput)
  // async createUser(@Arg('name') name: string, @Arg('email') email: string) {
  //   const user = User.create({ name, email })
  //   await user.save()
  //   return user
  // }
}
