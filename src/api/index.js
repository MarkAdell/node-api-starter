const Router = require('express').Router();
const userRoutes = require('./user/user.routes.js');

Router.use('/users', userRoutes);

module.exports = Router;
