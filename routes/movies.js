const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { getMovies, deleteMovie, updateMovie } = require('../controllers/movies');

const ROOT = '/movies';

module.exports = router
  .get(ROOT, getMovies)
  .delete(
    `${ROOT}/:movieId`,
    celebrate({
      [Segments.PARAMS]: {
        movieId: Joi.string().hex().length(24).required(),
      },
    }),
    deleteMovie,
  )
  .post(
    ROOT,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.string().required(),
        year: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        trailerLink: Joi.string().required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
        thumbnail: Joi.string().required(),
        movieId: Joi.string().required(),
      }),
    }),
    updateMovie,
  );
