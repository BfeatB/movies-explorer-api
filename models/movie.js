const mongoose = require('mongoose');
const validator = require('validator');
const { INVALID_URL_ERROR_MESSAGE } = require('../utils/consts');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: INVALID_URL_ERROR_MESSAGE,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: INVALID_URL_ERROR_MESSAGE,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: INVALID_URL_ERROR_MESSAGE,
    },
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
