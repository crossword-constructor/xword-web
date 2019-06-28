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
      if (req.user) {
        try {
          const user = await User.findById(req.user._id).populate({
            path: 'solvedPuzzles',
            options: {
              sort: { updatedAt: -1 },
              limit: 5,
            },
            populate: { path: 'puzzle', model: Puzzle },
          });
          if (!user) {
            throw new AuthenticationError('No user found');
          }
          return user;
        } catch (e) {
          return null;
        }
      } else return null;
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
      try {
        const { user, error } = await attemptSignup(args, res);
        if (error) {
          console.log({ error });
          return {
            code: '500',
            message: error.message,
            success: false,
          };
        }

        if (user) {
          return {
            user,
            code: '200',
            message: 'success',
            success: true,
          };
        }
      } catch (err) {
        console.log({ err });
        return {
          code: '500',
          message: 'Internal Server Error',
          success: false,
        };
      }
    },
    login: async (root, args, { req, res }, info) => {
      const user = await attemptLogin(args, res);

      return user;
    },
    signout: (root, args, { res }, info) => {
      try {
        signout(res);
        return { loggedIn: false };
      } catch (err) {
        return { loggedIn: true };
      }
    },
  },
};
