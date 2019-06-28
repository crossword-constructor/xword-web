import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
// import { signUp, signIn } from '../schemas';
import { attemptSignup, attemptLogin, signout } from '../auth';
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
          options: {
            limit: 5,
            // sort: { updatedAt: -1 },
          },
          populate: { path: 'puzzle', model: Puzzle },
        });
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
    signup: async (root, args, { req, res }, info) => {
      const user = await attemptSignup(args, res);
      return user;
    },
    login: async (root, args, { req, res }, info) => {
      console.log('attempting login');
      const user = await attemptLogin(args, res);

      return user;
    },
    signout: (root, args, { res }, info) => {
      console.log('destroing cookie');
      try {
        signout(res);
        return { loggedIn: false };
      } catch (err) {
        return { loggedIn: true };
      }
    },
  },
};
