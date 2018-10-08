const authDataAccess = require('./auth.dataAcess.js');
const bcrypt = require('../../utils/bcrypt.js');
const jwt = require('../../utils/jwt.js');
const authErrors = require('./auth.errors.js');
const APIError = require('../../utils/APIError.js');
const httpStatus = require('http-status');

const register = async (req, res, next) => {
  const userPayload = { ...req.body };
  try {
    const user = await authDataAccess.getOneUserByCustomColumn('email', userPayload.email);
    if (user) {
      throw new APIError(authErrors.duplicate);
    }
    userPayload.password = await bcrypt.hash(userPayload.password);
    const newUserId = await authDataAccess.saveUser(userPayload);
    await authDataAccess.saveUserInfo(newUserId, userPayload);
    const accessToken = jwt.generateAccessToken(newUserId);
    const refreshToken = jwt.generateRefreshToken();
    await authDataAccess.updateRefreshToken(newUserId, refreshToken);
    res.status(httpStatus.OK).json({
      code: httpStatus.CREATED,
      message: 'inserted user successfully',
      data: {
        userId: newUserId,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  // get email and password
  const { email, password } = req.body;
  try {
    // get user by email
    const user = await authDataAccess.getOneUserByCustomColumn('email', email);
    // send error if email doesn't exist
    if (!user) {
      throw new APIError(authErrors.wrongEmail);
    }
    // check if password correct
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      throw new APIError(authErrors.wrongPassword);
    }
    // if yes generate access and refresh token
    const accessToken = jwt.generateAccessToken(user.userId, user.isElder);
    const refreshToken = jwt.generateRefreshToken();
    // save refresh token in db
    await authDataAccess.updateRefreshToken(user.userId, refreshToken);
    // send user token and refresh token
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'successfully logged in',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  // search with refresh token in db
  try {
    const user = await authDataAccess.getOneUser('refresh_token', req.auth.refreshToken);
    if (!user) {
      // if not found, send UNAUTHORIZED,
      throw new APIError(authErrors.unauthenticated);
    }
    // if found, generate a new token and send it
    const accessToken = jwt.generateAccessToken(user.userId, user.isElder);
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'access token refreshed',
      data: {
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await authDataAccess.getOneUser('refresh_token', req.auth.refreshToken);
    if (user) {
      await authDataAccess.updateRefreshToken(user.userId, null);
    }
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: 'successfully logged out',
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
  refresh,
  logout,
  register,
};
