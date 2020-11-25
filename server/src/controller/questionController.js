const Question = require(".././model/Question");
const catchAsync = require("./../utils/catchAsync");

exports.createQuestion = catchAsync(async (req, res, next) => {
  const newQues = await Question.create(req.body);
  res.status(201).json(newQues);
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find();

  // Send response
  res.status(200).json({
    status: "success",
    results: questions.length,
    data: { questions },
  });
});
exports.getQuestion = catchAsync(async (req, res, next) => {});
exports.updateQuestion = catchAsync(async (req, res, next) => {});
exports.deleteQuestion = catchAsync(async (req, res, next) => {});
