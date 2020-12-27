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
exports.updateTest = catchAsync(async (req, res, next) => {});
exports.deleteTest = catchAsync(async (req, res, next) => {});
