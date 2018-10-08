const Router = require('express').Router();
const authRouter = require('./auth/auth.routes.js');
const userRoutes = require('./user/user.routes.js');

Router.use('/auth', authRouter);
Router.use('/users', userRoutes);

module.exports = Router;
