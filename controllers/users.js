const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  NoAuthError, NotFoundError, ConflictError, JWT_SECRET_KEY,
} = require('../utils');
const { UserNotFoundMessage } = require('../utils/consts');
const User = require('../models/user');

function handleUpdateUserInfoError(err, next, email) {
  if (err.code === 11000) {
    next(new ConflictError(`Email "${email}" уже зарегистрирован!`));
  } else {
    next(err);
  }
}

function getUserInfo(req, res, next) {
  User.findById(req.user._id)
    .orFail(new NotFoundError(UserNotFoundMessage))
    .then((user) => res.send(user))
    .catch((err) => next(err));
}

function updateProfile(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(UserNotFoundMessage))
    .then((user) => res.send(user))
    .catch((err) => handleUpdateUserInfoError(err, next, email));
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
      const user = JSON.parse(JSON.stringify(data));
      delete user.password;
      res.send(user);
    })
    .catch((err) => handleUpdateUserInfoError(err, next, email));
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
