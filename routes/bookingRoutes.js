const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSessionController,
);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookingsController)
  .post(bookingController.createBookingCheckoutController);

router
  .route('/:id')
  .get(bookingController.getBookingController)
  .patch(bookingController.updateBookingController)
  .delete(bookingController.deleteBookingController);

module.exports = router;
