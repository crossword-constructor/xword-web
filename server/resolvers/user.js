import Joi from 'joi';
import mongoose from 'mongoose';
import passport from 'passport';
import { UserInputError } from 'apollo-server-express';
import { signUp, signIn } from '../schemas';
// import { attemptSignIn, signOut } from '../auth';
import { User } from '../models';
import { resolveGraphqlOptions } from 'apollo-server-core';

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      return User.findById(req.session.userId);
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
      // console.log('info ', info);
      console.log('someone is signing up');
      // console.log(req);
      // console.log(resolveGraphqlOptions);
      // TODO: projection
      // await Joi.validate(args, signUp, { abortEarly: false });
      // console.log(req.body);
      passport.authenticate('local', (err, user, info) => {
        console.log('in here??');
        console.log('user ', user);
        console.log('info ', info);
        console.log('err: ', err);
        if (user) {
          return req.login(user, err => {
            if (err) {
              errors.sendError.InternalError(null, res);
            }
            res.json(user);
          });
        }
        let msg;
        if (info && info.message) {
          msg = info.message;
        } else {
          msg = info;
        }

        return errors.sendError.InvalidCredentialsError(msg, res);
      })(req, res);

      // const user = await User.create(args);

      // req.session.userId = user.id;

      // return user;
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
