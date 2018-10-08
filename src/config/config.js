if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logging: {
    level: process.env.LOGGING_LEVEL,
  },
  auth: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    accessTokenDuration: process.env.ACCESS_TOKEN_DURATION,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION,
  },
};

module.exports = config;
