const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverviewController);
router.get('/tour/:slug', viewController.getTourController);
router.get('/login', viewController.getLoginFormController);

module.exports = router;
