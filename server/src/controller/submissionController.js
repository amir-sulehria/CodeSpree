const Submission = require(".././model/Submission");
const catchAsync = require("./../utils/catchAsync");

exports.createSubmission = catchAsync(async (req, res, next) => {
  const newSubmission = await Submission.create(req.body);
  res.status(201).json(newSubmission);
});

exports.getAllSubmissions = catchAsync(async (req, res, next) => {
  const submissions = await Submission.find();

  // Send response
  res.status(200).json({
    status: "success",
    results: submissions.length,
    data: { submissions },
  });
});

exports.updateSubStatus = catchAsync(async (req, res, next) => {
  const submission = await Submission.findOneAndUpdate(
    { testID: req.params.id, userID: req.body.userId },
    {
      status: req.body.status,
    }
  );
  submission.save();
  res.status(201).json(submission);
});
exports.getSubmission = catchAsync(async (req, res, next) => {});

exports.getScore = catchAsync(async (req, res, next) => {
  const submission = await Submission.findOne({
    userID: req.body.userId,
    testID: req.body.testId,
  });
  res.status(201).json(submission);
});

exports.addAnswer = catchAsync(async (req, res, next) => {
  const submission = await Submission.findOne({
    userID: req.body.userId,
    testID: req.body.testId,
  });
  await submission.answers.push(req.body);
  await submission.save();
  res.status(201).json(submission);
});

exports.getRanking = catchAsync(async (req, res, next) => {
  const submission = await Submission.find({
    testID: req.params.id,
  })
    .populate("userID")
    .sort({ totalScore: "descending" });

  res.status(201).json(submission);
});

exports.updateSubmission = catchAsync(async (req, res, next) => {
  const submission = await Submission.findById(req.params.id);
  submission.answers.push(req.body);
  submission.save();
  res.status(201).json(submission);
});
exports.deleteSubmission = catchAsync(async (req, res, next) => {});
