const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BedRequestError = require('../errors/BedRequestError');

const createUser = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        ...req.body,
        password: hash,
      })
        .then((user) => {
          const {
            _id, name, about, avatar, email,
          } = user;
          res.status(201).send({
            _id, name, about, avatar, email,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BedRequestError('Переданы некорректные данные при создании пользователя'));
          } else if (err.code === 11000) {
            next(new ConflictError('Такой email уже существует на сервере.'));
          } else {
            next(err);
          }
        });
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else if (err.name === 'CastError') {
        throw new BedRequestError('Переданы некорректные данные пользователя');
      }
    })
    .catch(next);
};

const patchProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BedRequestError('Переданы некорректные данные при обновлении профиля.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
    })
    .catch(next);
};

const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BedRequestError('Переданы некорректные данные при обновлении аватара.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getAuthUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BedRequestError('Переданы некорректные данные пользователя.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  patchProfile,
  patchAvatar,
  login,
  getAuthUser,
};
