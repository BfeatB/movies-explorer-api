const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const authCheck = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const authRouter = require('./routes/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./utils');
const limiter = require('./utils/rate-limiter');

require('dotenv').config();

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.use(require('./routes/utils'));

app.use(authRouter);
app.use(authCheck);

app.use(require('./routes/movies'));
app.use(require('./routes/users'));

// Законное исключение из правила неиспользуемых параметров в функции,
// так как express.js применяет эти мидлвари в зависимости от количества аргументов функции,
// поэтому их объявление нельзя опустить, а реально использовать незачем!
// eslint-disable-next-line no-unused-vars
app.use((req, res) => {
  throw new NotFoundError('Not implemented');
});

app.use(errorLogger);

app.use(errors());

// Законное исключение из правила неиспользуемых параметров в функции,
// так как express.js применяет эти мидлвари в зависимости от количества аргументов функции,
// поэтому их объявление нельзя опустить, а реально использовать незачем!
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Ошибка сервера';
  res.status(status).json({ error: err.name, status, message });
});

mongoose.connect(DB_ADDRESS).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error(err);
});
