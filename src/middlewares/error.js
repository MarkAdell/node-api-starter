const httpStatus = require('http-status');
const APIError = require('../utils/APIError.js');
const { env } = require('../config/config.js');
const logger = require('../utils/logger.js');
const celebrate = require('celebrate');

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
const converter = (err, req, res, next) => {
  let convertedError = err;
  if (celebrate.isCelebrate(err)) {
    convertedError = new APIError({
      message: err.message,
      status: httpStatus.BAD_REQUEST,
      stack: err.stack,
      isPublic: true,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
      isPublic: err.isPublic,
    });
  }
  next(convertedError);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
const notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
    isPublic: true,
  });
  next(err);
};

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error(`Error: ${JSON.stringify({ message: err.message, errors: err.errors }, null, 2)}`);
  logger.error(`Error stack trace: ${err.stack}`);
  res.status(err.status).json({
    code: err.status,
    message: err.isPublic ? err.message : httpStatus[err.status],
    errors: err.errors,
    stack: env === 'development' ? err.stack : {},
  });
};

module.exports = {
  converter,
  notFound,
  handler,
};
