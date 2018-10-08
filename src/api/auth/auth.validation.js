const { Joi } = require('celebrate');

const loginSchema = {
  body: Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  }),
};

const postUserSchema = {
  body: Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    nickname: Joi.string().trim().min(3).max(30).required(),
  }),
};

module.exports = {
  loginSchema,
  postUserSchema,
};
