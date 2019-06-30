import Joi from '@hapi/joi';
import { UserInputError } from 'apollo-server-express';
import { AuthenticationError } from 'apollo-server-core';
import { signup, login } from '../schemas/user';
import { generateResponse } from '../utils';
import { attemptSignup, attemptLogin, signout } from '../auth';
import { User, Puzzle } from '../models';

export default {
  Query: {
    me: (root, args, { req }, info) => {
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
        let user;
        let error;
        try {
          user = await User.findById(req.user._id).populate({
            path: 'solvedPuzzles',
            options: {
              sort: { updatedAt: -1 },
              limit: 5,
            },
            populate: { path: 'puzzle', model: Puzzle },
          });
        } catch (err) {
          console.log(err);
          error = err;
          /** @todo process mongo error */
        }
        return generateResponse({ user }, error);
      }
    },

    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }
      return User.findById(id);
    },
  },

  Mutation: {
    signup: async (root, args, { req, res }, info) => {
      const validated = Joi.validate(args, signup);
      if (validated.error) {
        return generateResponse(null, {
          message: validated.error.details.map(e => e.message).join(' '),
        });
      }
      const { user, error } = await attemptSignup(args, res);
      return generateResponse({ user }, error);
    },

    login: async (root, args, { req, res }, info) => {
      const validated = Joi.validate(args, login);
      if (validated.error) {
        return generateResponse(null, {
          message: validated.error.details.map(e => e.message).join(' '),
        });
      }
      const { user, error } = await attemptLogin(args, res);
      return generateResponse({ user }, error);
    },

    signout: (root, args, { res }, info) => {
      try {
        signout(res);
        return { success: true, message: 'success', code: '200' };
      } catch (err) {
        return {
          success: false,
          message: 'Internal Server Error',
          code: '500',
        };
      }
    },
  },
};
