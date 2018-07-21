const Router = require('express').Router();
const userController = require('./user.controller.js');
const { postUserSchema, getUserSchema } = require('./user.validation');
const { celebrate } = require('celebrate');

Router.route('/')
  .post(
    celebrate(postUserSchema),
    userController.addUser,
  );

Router.route('/:id')
  .get(
    celebrate(getUserSchema),
    userController.getUser,
  );

module.exports = Router;
