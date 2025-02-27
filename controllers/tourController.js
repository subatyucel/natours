const Tour = require('../models/tourModel');

exports.getAllToursController = (req, res) => {
  console.log(req.requestTime);
  res.json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTourByIdController = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id == id);
  // res.json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTourController = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTourController = (req, res) => {
  res.json({
    status: 'success',
    data: {
      tour: '<Updated Tour Placeholder>',
    },
  });
};

exports.deleteTourController = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body must contain name and price property',
    });
  }

  next();
};
