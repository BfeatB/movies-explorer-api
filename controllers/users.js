const { NotFoundError } = require('../utils');
const User = require('../models/user');

function getUserInfo(req, res, next) {
  User.findById(req.user._id)
    .orFail(new NotFoundError(`Пользователь id = "${req.user._id}" не найден`))
    .then((user) => res.send(user))
    .catch((err) => next(err));
}

function updateProfile(req, res, next) {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    email: req.body.email,
  }, { new: true, runValidators: true })
    .orFail(new NotFoundError(`Пользователь id = "${req.user._id}" не найден`))
    .then((user) => res.send(user))
    .catch((err) => next(err));
}

module.exports = {
  updateProfile,
  getUserInfo,
};