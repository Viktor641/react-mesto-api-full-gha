const router = require('express').Router();
const {
  CreateCard,
  getCards,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validation');

router.post('/', validationCreateCard, CreateCard);
router.get('/', getCards);
router.delete('/:cardId', validationCardId, deleteCard);
router.put('/:cardId/likes', validationCardId, likeCard);
router.delete('/:cardId/likes', validationCardId, disLikeCard);

module.exports = router;
