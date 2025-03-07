const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router
  .route('/')
  .get(userController.getAllUsersController)
  .post(userController.createUserController);

router
  .route('/:id')
  .get(userController.getUserByIdController)
  .patch(userController.updateUserController)
  .delete(userController.deleteUserController);

module.exports = router;
