const { NotFoundError, NoAccessError } = require('../utils');
const { MOVIE_NOT_FOUND_ERROR_MESSAGE, NO_ACCESS_ERROR_MESSAGE } = require('../utils/consts');
const Movie = require('../models/movie');

function getMovies(req, res, next) {
  Movie.find({})
    .then((user) => res.send(user))
    .catch((err) => next(err));
}

function updateMovie(req, res, next) {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => next(err));
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND_ERROR_MESSAGE))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NoAccessError(NO_ACCESS_ERROR_MESSAGE);
      }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
}

module.exports = {
  getMovies,
  updateMovie,
  deleteMovie,
};
