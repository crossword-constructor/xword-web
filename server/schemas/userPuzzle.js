import Joi from '@hapi/joi';

const board = Joi.array().items(Joi.array().items(Joi.string().allow('')));
const _id = Joi.string();
const time = Joi.number();
export const updateUserPuzzle = Joi.object().keys({
  board,
  _id,
  time,
});
