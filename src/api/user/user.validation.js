const { Joi } = require('celebrate');

const postUserSchema = {
  body: Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  }),
};

const getUserSchema = {
  params: Joi.object().options({ abortEarly: false }).keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  postUserSchema,
  getUserSchema,
};
