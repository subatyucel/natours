const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverviewController);
router.get('/tour/:slug', viewController.getTourController);

module.exports = router;
