const { json } = require("express");
const Test = require(".././model/Test");
const Question = require(".././model/Question");
const User = require(".././model/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Submission = require("../model/Submission");

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
  const tests = await Test.find({
    submissionDeadline: { $gte: new Date(Date.now()) },
  }).select("date name registeredUsers status");

  // Send response
  res.status(200).json({
    status: "success",
    results: tests.length,
    data: { tests },
  });
});

exports.getTest = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.params.id).populate("questions");
  if (
    test.status === "available" &&
    new Date(test.submissionDeadline) > new Date(Date.now())
  ) {
    res.status(200).json({
      status: "success",
      data: test,
    });
  } else {
    return next(new AppError("This test is not available", 400));
  }
});

exports.openTest = catchAsync(async (req, res, next) => {
  const test = await Test.findByIdAndUpdate(req.params.id, {
    status: "available",
  });
  res.status(200).json({
    status: "success",
    data: test,
  });
});

exports.testSpeed = catchAsync(async (req, res, next) => {
  const FastSpeedtest = require("fast-speedtest-api");
  let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: false, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
    proxy: "http://optional:auth@my-proxy:123", // default: undefined
  });

  const s = await speedtest.getSpeed();

  res.status(200).json({
    status: "success",
    data: s,
  });
});
exports.testData = catchAsync(async (req, res, next) => {
  const tests = await Test.find();
  const testData = [];
  tests.map((t, i) => {
    testData.push({ name: t.name, totalCandidates: t.registeredUsers.length });
  });

  res.status(200).json({
    status: "success",
    data: testData,
  });
});

exports.getTime = (req, res, next) => {
  let date = new Date(Date.now()).toUTCString();
  res.status(200).json({
    status: "success",
    data: date,
  });
};

exports.addSolvedQues = catchAsync(async (req, res, next) => {
  const ques = await User.findByIdAndUpdate(req.params.id, {
    $push: { solvedQuestions: req.body.ques },
  });
  res.status(200).json({
    status: "success",
    data: ques,
  });
});

exports.getPracticeQues = catchAsync(async (req, res, next) => {
  const ques = await Question.find({ type: "Practice" });
  res.status(200).json({
    status: "success",
    data: ques,
  });
});

exports.updateTest = catchAsync(async (req, res, next) => {});
exports.deleteTest = catchAsync(async (req, res, next) => {});
