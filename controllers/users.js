const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  NoAuthError, NotFoundError, ConflictError, JWT_SECRET_KEY,
} = require('../utils');
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

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => {
      // eslint-disable-next-line no-underscore-dangle
      const user = { ...data._doc };
      delete user.password;
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(`Email "${email}" уже зарегистрирован!`));
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      next(new NoAuthError(err.message));
    });
}

module.exports = {
  updateProfile,
  getUserInfo,
  login,
  createUser,
};
