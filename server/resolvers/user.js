import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
// import { signUp, signIn } from '../schemas';
import { attemptSignUp, attemptSignIn, signOut } from '../auth';
import { User } from '../models';
import { resolveGraphqlOptions } from 'apollo-server-core';

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      return User.findById(req.user);
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
      const loggedIn = await attemptSignUp(args, res);
      return { loggedIn };
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
