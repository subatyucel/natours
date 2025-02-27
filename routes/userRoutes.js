const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

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
