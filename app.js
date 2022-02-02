const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Ошибка сервера';
  res.status(status).json({ error: err.name, status, message });
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb').then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});