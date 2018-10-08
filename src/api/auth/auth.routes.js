const Router = require('express').Router();
const { celebrate } = require('celebrate');
const validation = require('./auth.validation');
const authController = require('./auth.controller');
const { validateRefreshToken } = require('../../middlewares/validateRefreshToken.js');

Router.route('/register')
  .post(
    celebrate(validation.postUserSchema),
    authController.register,
  );

Router.route('/login')
  .post(
    celebrate(validation.loginSchema),
    authController.login,
  );

Router.route('/refresh')
  .post(
    validateRefreshToken,
    authController.refresh,
  );

Router.route('/logout')
  .post(
    validateRefreshToken,
    authController.logout,
  );

module.exports = Router;
