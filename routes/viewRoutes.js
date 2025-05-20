const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverviewController);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTourController);
router.get('/login', authController.isLoggedIn, viewController.getLoginFormController);
router.get('/me', authController.protect, viewController.getAccountController);

module.exports = router;
