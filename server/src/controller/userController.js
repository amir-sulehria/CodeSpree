const User = require(".././model/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeautures");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(User.find(), req.query).filter();
  const users = await features.query;
  // Send response
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

exports.sendTask = catchAsync(async (req, res, next) => {
  // const updatedUser = await User.findById(req.params.id);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: { upcomingTasks: req.body },
    }
  );
  // await updatedUser.inbox.push(req.body.message);
  // await updatedUser
  await updatedUser.save();
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.notifyUser = catchAsync(async (req, res, next) => {
  // const updatedUser = await User.findById(req.params.id);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: { inbox: req.body },
    }
  );
  // await updatedUser.inbox.push(req.body.message);
  // await updatedUser
  await updatedUser.save();
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if the user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /update-my-password instead!",
        400
      )
    );
  }

  // 2) Filter out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const inbox = await User.findById(req.params.id).select("inbox");
  // Send response

  res.status(200).json({
    status: "success",
    data: inbox,
  });
});

exports.getTasks = catchAsync(async (req, res, next) => {
  const inbox = await User.findById(req.params.id).select("upcomingTasks");
  // Send response

  res.status(200).json({
    status: "success",
    data: inbox,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.deleteUser = factory.deleteOne(User);
