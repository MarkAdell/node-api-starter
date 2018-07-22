const httpStatus = require('http-status');

/**
 * Class adding more properting to Error class
 */
class ExtendableError extends Error {
  constructor({
    message, errors, status, isPublic, stack, isOperational,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isOperational = isOperational;
    this.isPublic = isPublic;
    this.stack = stack;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error
 */
class APIError extends ExtendableError {
  /**
   * @param {string} message - Error message
   * @param {number} status - HTTP status code of error
   * @param {number} isOperational - Whether it's an operational or a programmer error
   * @param {boolean} isPublic - Whether the message should be visible to user or not
   */
  constructor({
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational = false,
    isPublic = false,
  }) {
    super({
      message, status, isPublic, isOperational,
    });
  }
}

module.exports = APIError;
