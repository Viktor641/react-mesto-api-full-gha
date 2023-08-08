const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/validation');

router.use('/signin', validationLogin, login);
router.use('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => {
  next(new NotFoundError('Сервер с указанным адресом не найден'));
});

module.exports = router;
