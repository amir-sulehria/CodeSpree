const Question = require(".././model/Question");
const catchAsync = require("./../utils/catchAsync");
const request = require("request");

exports.createQuestion = catchAsync(async (req, res, next) => {
  const newQues = await Question.create(req.body);
  await newQues.save();
  res.status(201).json(newQues);
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const questions = await Question.find({ madeBy: id });

  // Send response
  res.status(200).json({
    status: "success",
    data: questions,
  });
});
exports.runCode = catchAsync(async (req, res, next) => {
  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: req.body,
    },
    function (error, response, body) {
      if (error) {
        return next(new AppError("Cannot compile, try again!", 400));
      } else {
        res.status(response.statusCode).json({ data: body });
      }
    }
  );
});
exports.getQuestion = catchAsync(async (req, res, next) => {});
exports.updateQuestion = catchAsync(async (req, res, next) => {});
exports.deleteQuestion = catchAsync(async (req, res, next) => {});
