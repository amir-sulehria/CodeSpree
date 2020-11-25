const Test = require(".././model/Test");
const catchAsync = require("./../utils/catchAsync");

exports.createTest = catchAsync(async (req, res, next) => {
  const newTest = await Test.create(req.body);
  res.status(201).json(newTest);
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
exports.getTest = catchAsync(async (req, res, next) => {});
exports.updateTest = catchAsync(async (req, res, next) => {});
exports.deleteTest = catchAsync(async (req, res, next) => {});
