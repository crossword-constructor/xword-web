import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
// import { signUp, signIn } from "../schemas";
// import { attemptSignIn, signOut } from "../auth";
import { Puzzle, User, UserPuzzle } from '../models';

export default {
  Query: {
    playablePuzzle: async (root, args, { req }, info) => {
      console.log('in the qyerter');
      const { _id } = args;
      console.log({ _id });
      console.log(req.user._id);
      const [user, puzzle] = await Promise.all([
        User.findById(req.user._id).populate('solvedPuzzles'),
        Puzzle.findById(_id)
          .select('-clues._id')
          .populate({ path: 'clues.clue', select: 'text' })
          .populate({ path: 'clues.answer', select: 'text' })
          .lean(),
      ]);
      // console.log(user);
      // console.log(puzzle);
      if (!user) {
        throw new AuthenticationError();
      }

      if (!puzzle) {
        throw new Error('internal server error');
      }
      console.log('we here');
      let userPuzzle = user.solvedPuzzles.filter(sp => {
        console.log(sp);
        sp.puzzle.toString() === _id;
      })[0];
      console.log({ userPuzzle });
      console.log('userId', user._id);
      if (!userPuzzle) {
        userPuzzle = await UserPuzzle.create({
          puzzle: _id,
          board: puzzle.board.map(row =>
            row.map(cell => (cell === '#BlackSquare#' ? cell : ''))
          ),
          user: user._id,
        });
      }
      console.log('allGOod');
      return { puzzle, userPuzzle };
    },
    puzzles: (root, args, { req }, info) => {
      let regex = new RegExp(
        `^(${args.month})(\/)([0-9]|[0-2][0-9]|(3)[0-1])(\/)(${args.year})`
      );
      return Puzzle.find({ date: regex })
        .select('date title author')
        .then(puzzles => {
          return puzzles;
        });
    },
  },
};
