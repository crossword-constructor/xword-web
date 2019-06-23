import mongoose from 'mongoose';
import { UserPuzzle } from '../models';
import { resolveGraphqlOptions, AuthenticationError } from 'apollo-server-core';

const ObjectId = mongoose.Types.ObjectId;

export default {
  Mutation: {
    updateUserPuzzle: async (root, args, { req, res }, info) => {
      const { _id, board } = args;
      const userPuzzle = await UserPuzzle.findByIdAndUpdate(
        _id,
        {
          board,
        },
        { new: true }
      );
      console.log(userPuzzle);
      if (!userPuzzle) throw new Error('Internal Server Error');
      return { message: 'success' };
    },
  },
};
