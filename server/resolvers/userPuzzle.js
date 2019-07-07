import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import { updateUserPuzzle } from '../schemas/userPuzzle';
import { generateResponse } from '../utils';
import { UserPuzzle, Puzzle } from '../models';

const ObjectId = mongoose.Types.ObjectId;

export default {
  Query: {
    getSolvedPuzzles: async (root, args, { req, res }, info) => {
      const { user } = req;
      const { cursor } = args;
      console.log(cursor);
      let error;
      const puzzles = await UserPuzzle.find(
        { user: user._id, updatedAt: { $lt: cursor } },
        'updatedAt puzzle isSolved board isRevealed',
        { limit: 5 }
      ).populate({ path: 'puzzle', model: Puzzle, select: 'date' });
      const result = generateResponse({ solvedPuzzles: puzzles }, error);
      console.log({ result });
      return result;
    },
  },
  Mutation: {
    // @todo authorization
    updateUserPuzzle: async (root, args, { req, res }, info) => {
      console.log('updating user puzzle');
      const { _id } = args;
      const validated = Joi.validate(args, updateUserPuzzle);
      if (validated.error) {
        return generateResponse(null, {
          message: validated.error.details.map(e => e.message).join(' '),
        });
      }
      delete args._id;
      const userPuzzle = await UserPuzzle.findByIdAndUpdate(_id, args, {
        new: true,
      });
      if (!userPuzzle) throw new Error('Internal Server Error');
      return userPuzzle;
    },
  },
};
