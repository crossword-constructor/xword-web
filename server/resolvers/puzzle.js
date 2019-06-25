import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
// import { signUp, signIn } from "../schemas";
// import { attemptSignIn, signOut } from "../auth";
import { Puzzle, User, UserPuzzle } from '../models';

export default {
  Query: {
    playablePuzzle: async (root, args, { req }, info) => {
      const { _id } = args;
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
      let userPuzzle = user.solvedPuzzles.filter(sp => {
        return sp.puzzle.toString() === _id;
      })[0];
      if (!userPuzzle) {
        userPuzzle = await UserPuzzle.create({
          puzzle: _id,
          board: puzzle.board.map(row =>
            row.map(cell => (cell === '#BlackSquare#' ? cell : ''))
          ),
          user: user._id,
        });
      }
      return { puzzle, userPuzzle };
    },

    puzzles: async (root, args, { req }, info) => {
      if (!req.user.isAdmin) {
        throw new AuthenticationError('only admins can view these puzzles');
      }
      const { month, year } = args;
      let regex = new RegExp(
        `^(${month})(\/)([0-9]|[0-2][0-9]|(3)[0-1])(\/)(${year})`
      );
      const puzzles = await Puzzle.find({ date: regex }).select(
        'date title author'
      );
      if (!puzzles || puzzles.length === 0) {
      }
      return puzzles;
    },
  },
};
