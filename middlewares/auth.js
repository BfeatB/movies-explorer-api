const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, NoAuthError } = require('../utils');

function extractBearerToken(header) {
  return header.replace('Bearer ', '');
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NoAuthError('No or wrong authorization header'));
    return;
  }

  const token = extractBearerToken(authorization);

  try {
    req.user = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    next(new NoAuthError(err.message));
    return;
  }
  next();
};
