const NotFoundError = require('./errors/NotFoundError');
const NoAuthError = require('./errors/NoAuthError');
const NoAccessError = require('./errors/NoAccessError');
const BadRequestError = require('./errors/BadRequestError');
const ConflictError = require('./errors/ConflictError');
const { JWT_SECRET_KEY } = require('./consts');

module.exports = {
  JWT_SECRET_KEY,
  NotFoundError,
  NoAuthError,
  NoAccessError,
  BadRequestError,
  ConflictError,
};
