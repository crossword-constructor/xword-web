import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
// import { signUp, signIn } from "../schemas";
// import { attemptSignIn, signOut } from "../auth";
import { Puzzle, User, UserPuzzle } from '../models';

export default {
  Query: {
    playablePuzzle: async (root, args, { req }, info) => {
      const { id } = args;
      const [user, puzzle] = await Promise.all([
        User.findById(req.user._id).populate('solvedPuzzles'),
        Puzzle.findById(args.id)
          .select('-clues._id')
          .populate({ path: 'clues.clue', select: 'text' })
          .populate({ path: 'clues.answer', select: 'text' })
          .lean(),
      ]);

      if (!user) {
        throw new AuthenticationError();
      }

      if (!puzzle) {
        throw new Error('internal server error');
      }

      let userPuzzle = user.solvedPuzzles.filter(sp => {
        sp.puzzle._id.toString() === id;
      })[0];

      if (!userPuzzle) {
        userPuzzle = await UserPuzzle.create({
          puzzle: id,
          board: puzzle.board.map(row =>
            row.map(cell => (cell === '#BlackSquare#' ? cell : ''))
          ),
          user: user._id,
        });
      }
      console.log({ puzzle, userPuzzle });
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
