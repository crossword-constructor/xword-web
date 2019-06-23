import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
// import { signUp, signIn } from "../schemas";
// import { attemptSignIn, signOut } from "../auth";
import { Puzzle, User } from '../models';

export default {
  Query: {
    puzzle: async (root, args, { req }, info) => {
      const { id } = args;
      const [user, puzzle] = await Promise.all([
        User.findById(req.user._id),
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

      const userPuzzle = user.solvedPuzzles.filter(p => {
        p.puzzle.toString() === id;
      })[0];

      if (!userPuzzle) {
        user.solvedPuzzles.push({ puzzle: id, board: puzzle.board });
        user.save();
      } else {
        puzzle.board = userPuzzle.board;
      }

      return puzzle;
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
