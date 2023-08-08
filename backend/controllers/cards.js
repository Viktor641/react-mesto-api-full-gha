const Card = require('../models/card');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BedRequestError = require('../errors/BedRequestError');

const CreateCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BedRequestError('Переданы некорректные данные при создании карточки.');
      }
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => new Error('NotFound'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId).then(() => res.status(200).send(card));
      } else {
        next(new ForbiddenError('Нельзя удалять чужие карточки'));
      }
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BedRequestError('Переданы некорректные данные для постановки лайка.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
    })
    .catch(next);
};

const disLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BedRequestError('Переданы некорректные данные для снятия лайка.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
    })
    .catch(next);
};

module.exports = {
  CreateCard,
  getCards,
  deleteCard,
  likeCard,
  disLikeCard,
};
