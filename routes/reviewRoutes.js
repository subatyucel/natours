const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReviewController,
  )
  .get(reviewController.getAllReviewsController);

router
  .route('/:id')
  .get(reviewController.getReviewByIdController)
  .delete(reviewController.deleteReviewController)
  .patch(reviewController.updateReviewController);

module.exports = router;
