const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllToursController);

router.route('/tour-stats').get(tourController.getToursStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllToursController)
  .post(tourController.createTourController);

router
  .route('/:id')
  .get(tourController.getTourByIdController)
  .patch(tourController.updateTourController)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTourController,
  );

module.exports = router;
