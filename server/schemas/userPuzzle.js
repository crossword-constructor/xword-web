import Joi from '@hapi/joi';

const board = Joi.array().items(Joi.array().items(Joi.string().allow('')));
const _id = Joi.string();
export const updateUserPuzzle = Joi.object().keys({
  board,
  _id,
});
