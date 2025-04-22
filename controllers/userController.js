const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
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

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.getAllUsersController = factory.getAll(User);
exports.getUserByIdController = factory.getOne(User);
exports.deleteUserController = factory.deleteOne(User);
exports.updateUserController = factory.updateOne(User);
