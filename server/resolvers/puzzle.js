import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
// import { signUp, signIn } from "../schemas";
// import { attemptSignIn, signOut } from "../auth";
import { Puzzle } from '../models';

export default {
  Query: {
    puzzle: (root, args, context, info) => {
      console.log(args.id);
      return Puzzle.findById(args.id)
        .select('-clues._id')
        .populate({ path: 'clues.clue', select: 'text' })
        .populate({ path: 'clues.answer', select: 'text' })
        .lean()
        .then(puzzle => puzzle)
        .catch(err => {
          throw new Error(err);
        });
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
