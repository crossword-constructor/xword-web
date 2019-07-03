import Joi from '@hapi/joi';

const board = Joi.array().items(Joi.array().items(Joi.string().allow('')));
const _id = Joi.string(); // should check if this is a valid mongo_id
const time = Joi.number();
const revealedCells = Joi.array().items(Joi.array().items(Joi.number()));
const puzzleRevealed = Joi.boolean();
export const updateUserPuzzle = Joi.object().keys({
  _id,
  board,
  time,
  revealedCells,
  puzzleRevealed,
});
