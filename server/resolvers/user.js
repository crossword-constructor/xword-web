import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
// import { signUp, signIn } from '../schemas';
import { attemptSignUp, attemptSignIn, signOut } from '../auth';
import { User, Puzzle } from '../models';
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
        const user = await User.findById(req.user._id);
        return user;
      }
      throw new AuthenticationError('you are not logged in');
    },
    users: (root, args, context, info) => {
      // TODO: projection, pagination
      return User.find({});
    },

    profileInfo: async (root, args, { req }, info) => {
      console.log('here we are');
      try {
        const user = await User.findById(req.user._id).populate({
          path: 'solvedPuzzles',
          populate: { path: 'puzzle', model: Puzzle },
        });
        console.log('user: ', user);
        if (!user) {
          throw new AuthenticationError('No user found');
        }
        return user;
      } catch (e) {
        console.log(e);
      }
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
      const user = await attemptSignUp(args, res);
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
  },
};
