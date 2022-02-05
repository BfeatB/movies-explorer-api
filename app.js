const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/rate-limiter');
const routers = require('./routes/index');

require('dotenv').config();

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(helmet());
app.use(cors);
app.use(limiter);
app.use(routers);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Ошибка сервера';
  res.status(status).json({ error: err.name, status, message });
  return next();
});

mongoose.connect(DB_ADDRESS).then(() => {
  app.listen(PORT, () => {
    console.warn(`App listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error(err);
});
