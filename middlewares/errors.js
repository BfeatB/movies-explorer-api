function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Ошибка сервера';
  res.status(status).json({ error: err.name, status, message });
  return next();
}

module.exports = {
  errorHandler,
};
