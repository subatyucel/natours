const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviewsController = factory.getAll(Review);
exports.getReviewByIdController = factory.getOne(Review);
exports.createReviewController = factory.createOne(Review);
exports.deleteReviewController = factory.deleteOne(Review);
exports.updateReviewController = factory.updateOne(Review);
