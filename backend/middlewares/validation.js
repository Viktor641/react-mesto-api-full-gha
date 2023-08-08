const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BedRequestError = require('../errors/BedRequestError');

const validatorUrl = (url) => {
  if (!validator.isURL(url)) {
    throw new BedRequestError('Невалидный URL');
  } else {
    return url;
  }
};

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validatorUrl),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const validationPatchProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validationPatchAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validatorUrl),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validatorUrl),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationUserId,
  validationPatchProfile,
  validationPatchAvatar,
  validationCreateCard,
  validationCardId,
};
