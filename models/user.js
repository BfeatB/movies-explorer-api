const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { INVALID_EMAIL_ERROR_MESSAGE, INVALID_USER_DATA_ERROR_MESSAGE } = require('../utils/consts');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    minlength: 2,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: INVALID_EMAIL_ERROR_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(INVALID_USER_DATA_ERROR_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(INVALID_USER_DATA_ERROR_MESSAGE));
          }

          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
