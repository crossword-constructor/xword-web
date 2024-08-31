import { Resolver, Query, Mutation, Args, Ctx } from 'type-graphql';
import { PuzzlesResponse } from '../typeDefs/puzzle';
import { User } from '../typeDefs/user';
import { UserPuzzle } from '../typeDefs/userPuzzle';
import { Puzzle } from '../typeDefs/puzzle';

@Resolver()
export class PuzzleResolver {
  @Query(() => PuzzlesResponse)
  async playablePuzzle(@Args() { _id }, @Ctx() { req }) {
    if (!req.user.isAdmin) {
      // @todo save error objects as constans somewhere
      return {
        success: false,
        message: 'You must be an admin to view this page',
        code: '403',
      };
    }
    let user;
    let error;
    let puzzle;
    let userPuzzle;
    try {
      // ??? ummm is this order guaranteed?
      [user, puzzle] = await Promise.all([
        User.findById(req.user._id).populate('solvedPuzzles'),
        Puzzle.findById(_id)
          .select('-clues._id')
          .populate({ path: 'clues.clue', select: 'text' })
          .populate({ path: 'clues.answer', select: 'text' })
          .lean(),
      ]);
      userPuzzle = user.solvedPuzzles.filter(sp => {
        return sp.puzzle.toString() === _id;
      })[0];
      if (!userPuzzle) {
        userPuzzle = await UserPuzzle.create({
          puzzle: _id,
          board: puzzle.board.map(cell => ({...cell, text: ''})),
          user: user._id,
          time: 0,
        });
      }
    } catch (err) {
      /** @todo handle mongo error */
      error = err;
    }
    return generateResponse(
      { 
        playablePuzzle: {
            puzzle: {
              ...puzzle, 
              dimensions: { height: puzzle.dimensions.rows, width: puzzle.dimensions.columns }
            },
          userPuzzle 
        }
      },
      error
    );
  },
  @Mutation(() => User)
  async createUser(@Arg("name") name: string, @Arg("email") email: string) {
    const user = User.create({ name, email });
    await user.save();
    return user;
  }
}