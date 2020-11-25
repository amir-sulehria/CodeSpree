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
exports.getSubmission = catchAsync(async (req, res, next) => {});
exports.updateSubmission = catchAsync(async (req, res, next) => {
  const submission = await Submission.findById(req.params.id);
  submission.answers.push(req.body);
  submission.save();
  res.status(201).json(submission);
});
exports.deleteSubmission = catchAsync(async (req, res, next) => {});
