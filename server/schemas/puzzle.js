import Joi from "joi";

// const date = Joi.string()
//   .email()
//   .required()
//   .label("Email");

// const title = Joi.string()
//   .alphanum()
//   .min(4)
//   .max(30)
//   .required()
//   .label("Username");

// const author = Joi.string()
//   .max(254)
//   .required()
//   .label("Name");

// const publisher = Joi.string()
//   .max(254)
//   .required()
//   .label("Name");

// const board = ;

// const clueAnswers;

export const fetchPuzzlesByDate = Joi.object().keys({
  // email,
  // username,
  // name,
  // password
});
