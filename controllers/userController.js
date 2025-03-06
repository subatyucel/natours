const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsersController = catchAsync(async (req, res) => {
  const users = await User.find();

  res.json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUserController = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.getUserByIdController = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUserController = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteUserController = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
