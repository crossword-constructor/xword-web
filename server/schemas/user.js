import Joi from '@hapi/joi';

const email = Joi.string()
  .email()
  .required()
  .label('Email');

const username = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
  .label('Username');

const name = Joi.string()
  .max(254)
  .required()
  .label('Name');

const password = Joi.string()
  .min(8)
  .max(50)
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
  .required()
  .label('Password')
  .options({
    language: {
      string: {
        regex: {
          base:
            'must have at least one lowercase letter, one uppercase letter, and one digit.',
        },
      },
    },
  });

export const signup = Joi.object().keys({
  email,
  username,
  name,
  password,
});

export const login = Joi.object().keys({
  username,
  password,
});
