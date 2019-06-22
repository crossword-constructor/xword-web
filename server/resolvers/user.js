import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
// import { signUp, signIn } from '../schemas';
import { attemptSignUp, attemptSignIn, signOut } from '../auth';
import { User } from '../models';
import { resolveGraphqlOptions, AuthenticationError } from 'apollo-server-core';

const ObjectId = mongoose.Types.ObjectId;

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      return User.findById(req.user._id);
    },

    verifyLoggedIn: async (root, args, { req }, info) => {
      if (req.user) {
        console.log('USER: ', req.user._id);
        const user = await User.findById(req.user._id);
        console.log(user);
        return user;
      }
      throw new AuthenticationError('you are not logged in');
    },
    users: (root, args, context, info) => {
      // TODO: projection, pagination
      console.log('getting users');
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }
      return User.findById(id);
    },
  },
  Mutation: {
    signUp: async (root, args, { req, res }, info) => {
      console.log('here?');
      const user = await attemptSignUp(args, res);
      console.log({ user });
      return user;
    },
    signIn: async (root, args, { req }, info) => {
      // TODO: projection
      await Joi.validate(args, signIn, { abortEarly: false });

      const user = await attemptSignIn(args.email, args.password);

      req.session.userId = user.id;

      return user;
    },
    signOut: (root, args, { req, res }, info) => {
      return signOut(req, res);
    },

    updatePlayerBoard: async (root, args, { req, res }, info) => {
      const { puzzleId, board } = args;
      const user = await User.findById(req.user._id);
      if (!user) {
        throw new Error('internal server error');
      }
      const puzzle = user.solvedPuzzles.filter(puz => {
        console.log(puz.puzzle);
        console.log(puz.puzzle === puzzleId);
        return puz.puzzle == puzzleId;
      })[0];
      console.log({ puzzle });
      if (puzzle) {
        console.log('that puzzle exists');
      } else {
        user.solvedPuzzles.push({
          board,
          puzzle: puzzleId,
        });
        console.log(user.solvedPuzzles);
        await user.save();
      }
      return { message: 'success' };
    },
  },
};
