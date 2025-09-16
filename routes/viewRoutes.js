const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckoutController,
  authController.isLoggedIn,
  viewController.getOverviewController,
);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTourController);
router.get('/login', authController.isLoggedIn, viewController.getLoginFormController);
router.get('/sign-up', authController.isLoggedIn, viewController.getSignUpFormController);
router.get('/me', authController.protect, viewController.getAccountController);
router.get('/my-tours', authController.protect, viewController.getMyToursController);

module.exports = router;
