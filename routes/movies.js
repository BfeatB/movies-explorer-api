const router = require('express').Router();
const { deleteMovieValidation, updateMovieValidator } = require('../utils/validation');
const { getMovies, deleteMovie, updateMovie } = require('../controllers/movies');

const ROOT = '/movies';

module.exports = router
  .get(ROOT, getMovies)
  .delete(
    `${ROOT}/:movieId`,
    deleteMovieValidation,
    deleteMovie,
  )
  .post(
    ROOT,
    updateMovieValidator,
    updateMovie,
  );
