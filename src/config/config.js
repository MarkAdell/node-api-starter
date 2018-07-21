if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logging: {
    level: process.env.LOGGING_LEVEL,
  },
};

module.exports = config;
