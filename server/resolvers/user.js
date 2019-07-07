import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { AuthenticationError } from 'apollo-server-core';
import { signup, login } from '../schemas/user';
import { generateResponse } from '../utils';
import { attemptSignup, attemptLogin, signout } from '../auth';
import { User, Puzzle } from '../models';

const { ObjectId } = mongoose.Types;

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
        let users;
        let user;
        let populatedUser;
        let error;
        try {
          /** Unfortunately we need to query twice because model.aggregate cannot $lookup across databases */
          populatedUser = await User.findById(req.user._id)
            .populate({
              path: 'solvedPuzzles',
              select: 'puzzle board updatedAt',
              options: { limit: 5, sort: { updatedAt: -1 } },
              populate: { path: 'puzzle', model: Puzzle, select: 'date' },
            })
            .lean();
          users = await User.aggregate([
            {
              $match: { _id: ObjectId(req.user._id) },
            },
            {
              $lookup: {
                from: 'userpuzzles',
                localField: 'solvedPuzzles',
                foreignField: '_id',
                as: 'solvedPuzzleObjects',
              },
            },
            {
              $addFields: {
                solvedPuzzleStats: {
                  total: { $size: '$solvedPuzzles' },
                  solved: {
                    $size: {
                      $filter: {
                        input: '$solvedPuzzleObjects',
                        as: 'sp',
                        cond: {
                          $and: [
                            '$$sp.isSolved',
                            { $ne: ['$$sp.isRevealed', true] },
                          ],
                        },
                      },
                    },
                  },
                  revealed: {
                    $size: {
                      $filter: {
                        input: '$solvedPuzzleObjects',
                        as: 'sp',
                        cond: '$$sp.isRevealed',
                      },
                    },
                  },
                },
              },
            },
          ]).exec();
          user = users[0];
          populatedUser.solvedPuzzleStats = user.solvedPuzzleStats;
        } catch (err) {
          console.log(err);
          error = err;
          /** @todo process mongo error */
        }
        const result = generateResponse({ user: populatedUser }, error);
        console.log(result);
        return result;
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
