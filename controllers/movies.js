const { NotFoundError, NoAccessError } = require('../utils');
const { MovieNotFoundMessage, NoAccessMessage } = require('../utils/consts');
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
    .orFail(new NotFoundError(MovieNotFoundMessage))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NoAccessError(NoAccessMessage);
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
