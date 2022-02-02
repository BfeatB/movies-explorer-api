const validator = require('validator');
const { CelebrateError } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const NoAuthError = require('./errors/NoAuthError');
const NoAccessError = require('./errors/NoAccessError');
const BadRequestError = require('./errors/BadRequestError');
const ConflictError = require('./errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;
const JWT_SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

function validateEmail(value) {
  if (validator.isURL(value)) {
    return value;
  }
  throw new CelebrateError(`"${value}" is not a valid URL`);
}

module.exports = {
  JWT_SECRET_KEY,
  validateEmail,
  NotFoundError,
  NoAuthError,
  NoAccessError,
  BadRequestError,
  ConflictError,
};