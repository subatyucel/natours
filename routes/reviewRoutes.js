const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReviewController,
  )
  .get(reviewController.getAllReviewsController);

router.route('/:id').delete(reviewController.deleteReviewController);

module.exports = router;
