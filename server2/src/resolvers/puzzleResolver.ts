import { Resolver, Query, Mutation, Args, Ctx } from 'type-graphql'
import { PlayablePuzzleResponse, PuzzlesResponse } from '../typeDefs/Puzzle'
import { User } from '../typeDefs/User'
import { UserPuzzle } from '../typeDefs/UserPuzzle'
import { Puzzle } from '../typeDefs/Puzzle'
import { IGraphQLContext } from '../types/types'
import { generateResponse } from '../utils/response'

@Resolver(PlayablePuzzleResponse)
export class PuzzleResolver {
  constructor() {}
  @Query(() => PlayablePuzzleResponse)
  async playablePuzzle(): // @Ctx() { user }: IGraphQLContext
  // @Args() { _id }: { _id: string }
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
    // if (!user.isAdmin) {
    //   // @todo save error objects as constans somewhere
    //   return {
    //     success: false,
    //     message: 'You must be an admin to view this page',
    //     code: '403',
    //   }
    // }
    // let error
    // let puzzle
    // let userPuzzle
    // try {
    //   // ??? ummm is this order guaranteed?
    //   // [user, puzzle] = await Promise.all([
    //   //   User.findById(req.user._id).populate('solvedPuzzles'),
    //   //   Puzzle.findById(_id)
    //   //     .select('-clues._id')
    //   //     .populate({ path: 'clues.clue', select: 'text' })
    //   //     .populate({ path: 'clues.answer', select: 'text' })
    //   //     .lean(),
    //   // ]);
    //   // userPuzzle = user.solvedPuzzles.filter(sp => {
    //   //   return sp.puzzle.toString() === _id;
    //   // })[0];
    //   // if (!userPuzzle) {
    //   //   userPuzzle = await UserPuzzle.create({
    //   //     puzzle: _id,
    //   //     board: puzzle.board.map(cell => ({...cell, text: ''})),
    //   //     user: user._id,
    //   //     time: 0,
    //   //   });
    //   // }
    // } catch (err) {
    //   /** @todo handle mongo error */
    //   error = err
    // }
    // return generateResponse(
    //   {
    //     playablePuzzle: {
    //       puzzle: {
    //         // ...puzzle,
    //         // dimensions: { height: puzzle.dimensions.rows, width: puzzle.dimensions.columns }
    //       },
    //       userPuzzle,
    //     },
    //   },
    //   error
    // )
  }
  // @Mutation(() => User)
  // // async createUser(@Arg('name') name: string, @Arg('email') email: string) {
  // //   const user = User.create({ name, email })
  // //   await user.save()
  // //   return user
  // // }
}
