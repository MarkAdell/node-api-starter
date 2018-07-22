const httpStatus = require('http-status');

const errors = {
  notFound: {
    message: 'user does not exist',
    status: httpStatus.NOT_FOUND,
    isOperational: true,
    isPublic: true,
  },
  duplicate: {
    message: 'this email is used',
    status: httpStatus.CONFLICT,
    isOperational: true,
    isPublic: true,
  },
};

module.exports = errors;
