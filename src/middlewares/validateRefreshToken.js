const jwt = require('../utils/jwt.js');
const APIError = require('../utils/APIError.js');
const httpStatus = require('http-status');

const validateRefreshToken = (req, res, next) => {
  try {
    let refreshToken;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer' && authHeader.split(' ')[1]) {
      refreshToken = authHeader.split(' ')[1];
    } else {
      throw new APIError({
        message: 'No token in authorization header',
        status: httpStatus.BAD_REQUEST,
        isOperational: true,
        isPublic: true,
      });
    }
    jwt.verifyRefreshToken(refreshToken);
    req.auth = { refreshToken };
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      next(new APIError({
        message: err.message,
        status: httpStatus.UNAUTHORIZED,
        isOperational: true,
        isPublic: true,
      }));
    } else {
      next(err);
    }
  }
};

module.exports = {
  validateRefreshToken,
};
