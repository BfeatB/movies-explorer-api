const validator = require('validator');
const {
  celebrate, CelebrateError, Joi, Segments,
} = require('celebrate');
const { INVALID_URL_ERROR_MESSAGE } = require('./consts');

function validateEmail(value) {
  if (validator.isURL(value)) {
    return value;
  }
  throw new CelebrateError(INVALID_URL_ERROR_MESSAGE);
}

module.exports = {
  signinValidator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  signupValidator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  deleteMovieValidation: celebrate({
    [Segments.PARAMS]: {
      movieId: Joi.string().hex().length(24).required(),
    },
  }),
  updateMovieValidator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(validateEmail),
      trailer: Joi.string().required().custom(validateEmail),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().custom(validateEmail),
      movieId: Joi.number().required(),
    }),
  }),
  updateProfileValidator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().min(2).required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
};
