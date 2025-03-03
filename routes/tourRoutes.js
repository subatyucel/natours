const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllToursController);

router.route('/tour-stats').get(tourController.getToursStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllToursController)
  .post(tourController.createTourController);

router
  .route('/:id')
  .get(tourController.getTourByIdController)
  .patch(tourController.updateTourController)
  .delete(tourController.deleteTourController);

module.exports = router;
