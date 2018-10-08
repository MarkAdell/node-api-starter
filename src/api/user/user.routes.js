const Router = require('express').Router();
const userController = require('./user.controller.js');
const { validateAccessToken } = require('../../middlewares/validateAccessToken.js');

Router.route('/me')
  .get(
    validateAccessToken,
    userController.getCurrentUser,
  );

module.exports = Router;
