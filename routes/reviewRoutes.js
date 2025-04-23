const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReviewController,
  )
  .get(reviewController.getAllReviewsController);

router
  .route('/:id')
  .get(reviewController.getReviewByIdController)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReviewController,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReviewController,
  );

module.exports = router;
