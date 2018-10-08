const httpStatus = require('http-status');
const userDataAccess = require('./user.dataAccess.js');
const APIError = require('../../utils/APIError.js');
const userErrors = require('./user.errors.js');

const getCurrentUser = async (req, res, next) => {
  const currentUserId = req.user.id; // coming from token
  try {
    const user = await userDataAccess.getUserInfoById(currentUserId);
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
  getCurrentUser,
};
