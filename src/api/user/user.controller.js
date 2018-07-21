const httpStatus = require('http-status');
const userDataAccess = require('./user.dataAccess.js');
const APIError = require('../../utils/APIError.js');
const bcrypt = require('../../utils/bcrypt.js');

const addUser = async (req, res, next) => {
  const userObj = req.body;
  try {
    const user = await userDataAccess.getUserByEmail(userObj.email);
    if (user) {
      throw new APIError({
        message: 'this email is used', status: httpStatus.CONFLICT, isPublic: true,
      });
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
      throw new APIError({
        message: 'user does not exist', status: httpStatus.NOT_FOUND, isPublic: true,
      });
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
