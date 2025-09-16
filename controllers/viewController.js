const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getOverviewController = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTourController = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) next(new AppError('There is no tour with that name!', 404));

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginFormController = (req, res) => {
  res.status(200).render('login', { title: 'Log into your account.' });
};

exports.getSignUpFormController = (req, res) => {
  res.status(200).render('signup', { title: 'Sign Up' });
};

exports.getAccountController = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyToursController = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', { title: 'My Tours', tours });
});
