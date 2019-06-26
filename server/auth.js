import jwt from 'jsonwebtoken';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { User } from './models';
import { SESS_SECRET, SESS_NAME } from './config';
/**
 * @function attemptSignIn
 * @description tries to create a user from uesrInfo and attaches a jwt to req.cookie
 * @param  {Object} userInfo -- see ./models/user
 * @param  {Object} res express object
 * @return {Bool} success
 */
export const attemptSignup = async (userInfo, res) => {
  let user;
  try {
    user = await User.create(userInfo);
  } catch (err) {
    console.log('errrrrrrr, ', err);
    // move to util function formatMongoError
    let message = '';
    Object.keys(err.errors).forEach(key => {
      message += err.errors[key] + ' ';
    });

    throw new AuthenticationError(message);
  }
  const payload = user.authSummary();
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: '2d',
  });
  res.cookie('user', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 2,
  });
  return user;
};

export const attemptLogin = async ({ username, password }, res) => {
  const message = 'Incorrect email or password. Please try again.';
  const user = await User.findOne({ username }).populate({
    path: 'solvedPuzzles',
    populate: 'puzzle',
  });
  if (!user || !(await user.matchesPassword(password))) {
    throw new AuthenticationError(message);
  }
  const populatedUser = await user;
  console.log(user);
  const payload = user.authSummary();
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: '2d',
  });
  res.cookie('user', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 2,
  });
  return user;
};

const signedIn = req => req.user._id;

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.');
  }
};

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in.');
  }
};

export const signout = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);

      res.clearCookie(SESS_NAME);

      resolve(true);
    });
  });
