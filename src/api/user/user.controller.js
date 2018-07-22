const httpStatus = require('http-status');
const userDataAccess = require('./user.dataAccess.js');
const APIError = require('../../utils/APIError.js');
const bcrypt = require('../../utils/bcrypt.js');
const userErrors = require('./user.errors.js');

const addUser = async (req, res, next) => {
  const userObj = req.body;
  try {
    const user = await userDataAccess.getUserByEmail(userObj.email);
    if (user) {
      throw new APIError(userErrors.duplicate);
    }
    userObj.password = await bcrypt.hash(userObj.password);
    const newUser = await userDataAccess.saveUser(userObj);
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'inserted user successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const userID = +req.params.id;
  try {
    const user = await userDataAccess.getUserByID(userID);
    if (!user) {
      throw new APIError(userErrors.notFound);
    }
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'retrieved user successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  addUser,
};
