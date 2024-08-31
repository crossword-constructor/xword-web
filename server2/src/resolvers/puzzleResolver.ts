import { Resolver, Query, Mutation, Args, Ctx } from 'type-graphql'
import {
  PlayablePuzzleInput,
  PlayablePuzzleResponse,
  PuzzlesResponse,
} from '../typeDefs/Puzzle'
import { User } from '../typeDefs/User'
import { UserPuzzle } from '../typeDefs/UserPuzzle'
import { Puzzle } from '../typeDefs/Puzzle'
import { IGraphQLContext } from '../types/types'
import { generateResponse } from '../utils/response'

@Resolver(PlayablePuzzleResponse)
export class PuzzleResolver {
  constructor() {}
  @Query(() => PlayablePuzzleResponse)
  async playablePuzzle(
    @Args() { id }: PlayablePuzzleInput
  ): // @Ctx() { user }: IGraphQLContext
  Promise<PlayablePuzzleResponse> {
    await Promise.resolve()
    return {
      error: null,
      success: true,
      puzzle: {
        // ...puzzle,
        // dimensions: { height: puzzle.dimensions.rows, width: puzzle.dimensions.columns }
      } as Puzzle,
      userPuzzle: {} as UserPuzzle,
    } as unknown as PlayablePuzzleResponse
  }

  // @Mutation(() => PlayablePuzzleResponse)
  // async createPuzzle(@args() puzzle: PlayablePuzzleInput)
  // async createUser(@Arg('name') name: string, @Arg('email') email: string) {
  //   const user = User.create({ name, email })
  //   await user.save()
  //   return user
  // }
}
