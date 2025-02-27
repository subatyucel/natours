const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();
router
  .route('/')
  .get(tourController.getAllToursController)
  .post(tourController.checkBody, tourController.createTourController);

router
  .route('/:id')
  .get(tourController.getTourByIdController)
  .patch(tourController.updateTourController)
  .delete(tourController.deleteTourController);

module.exports = router;
