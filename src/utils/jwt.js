const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const {
  accessTokenKey,
  accessTokenDuration,
  refreshTokenKey,
  refreshTokenDuration,
} = config.auth;

const generateAccessToken = (userId) => {
  const token = jwt.sign({
    sub: userId,
  }, accessTokenKey, { expiresIn: accessTokenDuration });
  return token;
};

const generateRefreshToken = () => {
  const refreshToken = jwt.sign({
  }, refreshTokenKey, { expiresIn: refreshTokenDuration });
  return refreshToken;
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, accessTokenKey);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenKey);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
