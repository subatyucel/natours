const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverviewController);
router.get('/tour/:slug', viewController.getTourController);
router.get('/login', viewController.getLoginFormController);

module.exports = router;
