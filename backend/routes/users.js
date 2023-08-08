const router = require('express').Router();
const {
  getUsers,
  getUser,
  patchProfile,
  patchAvatar,
  getAuthUser,
} = require('../controllers/users');

const {
  validationUserId,
  validationPatchProfile,
  validationPatchAvatar,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getAuthUser);
router.get('/:userId', validationUserId, getUser);
router.patch('/me', validationPatchProfile, patchProfile);
router.patch('/me/avatar', validationPatchAvatar, patchAvatar);

module.exports = router;
