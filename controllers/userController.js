const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

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

exports.getUserByIdController = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateMeController = catchAsync(async (req, res, next) => {
  //Create an error if user posts password data
  if (req.body.password || req.body.passwordConfirm)
    next(
      new AppError(
        "This route is not for password updates! Please use '/update-my-password' instead!",
        400,
      ),
    );

  //filter out unwanted body fields
  const filteredBody = filterObj(req.body, 'name', 'email');

  //update user data
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.json({
    staus: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMeController = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
