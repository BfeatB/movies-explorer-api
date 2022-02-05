const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errors');
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
app.use(errorHandler);

mongoose.connect(DB_ADDRESS).then(() => {
  app.listen(PORT, () => {
    console.warn(`App listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error(err);
});
