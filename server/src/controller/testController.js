const { json } = require("express");
const Test = require(".././model/Test");
const catchAsync = require("./../utils/catchAsync");

exports.createTest = catchAsync(async (req, res, next) => {
  const newTest = await Test.create(req.body);
  await newTest.save();
  res.status(201).json(newTest);
});

exports.addQuestions = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.params.id);
  await test.set({ questions: JSON.parse(req.body.data) });
  await test.save();
  res.status(201).json(test);
});

exports.registerCandidate = catchAsync(async (req, res, next) => {
  const test = await Test.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: { registeredUsers: req.body.userId },
    }
  );
  console.log(req.params.id);
  console.log(test);
  await test.save();

  res.status(201).json(test);
});

exports.getAllTests = catchAsync(async (req, res, next) => {
  const tests = await Test.find();

  // Send response
  res.status(200).json({
    status: "success",
    results: tests.length,
    data: { tests },
  });
});

exports.getUpcomingTests = catchAsync(async (req, res, next) => {
  const tests = await Test.find({ status: "upcoming" }).select(
    "date name registeredUsers"
  );

  // Send response
  res.status(200).json({
    status: "success",
    results: tests.length,
    data: { tests },
  });
});
exports.getTest = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.params.id).populate("questions");
  res.status(200).json({
    status: "success",
    data: test,
  });
});
exports.updateTest = catchAsync(async (req, res, next) => {});
exports.deleteTest = catchAsync(async (req, res, next) => {});
