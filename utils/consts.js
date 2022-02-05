const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = {
  NO_AUTH_HEADER_MESSAGE: 'Нет авторизационного заголовка',
  SERVER_ERROR_MESSAGE: 'Ошибка сервера',
  MOVIE_NOT_FOUND_ERROR_MESSAGE: 'Фильм не найден',
  NO_ACCESS_ERROR_MESSAGE: 'Нет доступа',
  USER_NOT_FOUND_ERROR_MESSAGE: 'Пользователь не найден',
  NOT_IMPLEMENTED_ERROR_MESSAGE: 'Такого адреса нет',
  SERVER_CRASH_ERROR_MESSAGE: 'Сервер сейчас упадет',
  INVALID_URL_ERROR_MESSAGE: 'URL не валидный',
  INVALID_EMAIL_ERROR_MESSAGE: 'Неправильный формат почты',
  INVALID_USER_DATA_ERROR_MESSAGE: 'Неправильные почта или пароль',
  DEFAULT_DB_ADDRESS: 'mongodb://localhost:27017/moviesdb',
  DEFAULT_PORT: 3000,
  DEV_JWT_SECRET: 'dev-secret',
  JWT_SECRET_KEY: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
