const httpStatus = require('http-status');

const errors = {
  wrongEmail: {
    message: 'wrong email',
    status: httpStatus.NOT_FOUND,
    isOperational: true,
    isPublic: true,
  },
  wrongPassword: {
    message: 'wrong password',
    status: httpStatus.UNAUTHORIZED,
    isOperational: true,
    isPublic: true,
  },
  duplicate: {
    message: 'this email is taken',
    status: httpStatus.CONFLICT,
    isOperational: true,
    isPublic: true,
  },
  unauthenticated: {
    message: 'user not authenticated',
    status: httpStatus.UNAUTHORIZED,
    isOperational: true,
    isPublic: true,
  },
};

module.exports = errors;
