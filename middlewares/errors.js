const { SERVER_ERROR_MESSAGE } = require('../utils/consts');

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || SERVER_ERROR_MESSAGE;
  res.status(status).json({ error: err.name, status, message });
  return next();
}

module.exports = {
  errorHandler,
};
