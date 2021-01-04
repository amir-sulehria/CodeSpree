const AppError = require("./../utils/appError");
const Submission = require(".././model/Submission");
const request = require("request");
const User = require(".././model/User");
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
exports.getSubmission = catchAsync(async (req, res, next) => {
  const submission = await Submission.findById(req.params.id).populate(
    "userID"
  );

  res.status(201).json(submission);
});

exports.getScore = catchAsync(async (req, res, next) => {
  const submission = await Submission.findOne({
    userID: req.body.userId,
    testID: req.body.testId,
  });
  res.status(201).json(submission);
});

exports.cancelTest = catchAsync(async (req, res, next) => {
  const submission = await Submission.findByIdAndUpdate(req.params.id, {
    status: "cancelled",
  });
  res.status(201).json(submission);
});

exports.addAnswer = catchAsync(async (req, res, next) => {
  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      console.log("-------------");
      console.log(typeof myArray[i].questionId.toString());
      console.log(typeof nameKey);
      console.log(myArray[i].questionId.toString() === nameKey);

      console.log("-------------");
      if (myArray[i].questionId.toString() === nameKey) {
        return myArray[i];
      }
    }
  }

  const submission = await Submission.findOne({
    userID: req.body.userId,
    testID: req.body.testId,
  });
  let arr = submission.answers;
  var resultObject = search(req.body.questionId, arr);
  if (typeof resultObject === "undefined") {
    await submission.answers.push(req.body);
    await submission.save();
    res.status(201).json(submission);
  } else {
    return next(new AppError("This question is already submitted", 400));
  }
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

exports.addImg = catchAsync(async (req, res, next) => {
  let imgNum = 1;
  let submission = "";
  let img = "";

  const user = await User.findById(req.body.userID).select("photo");
  const userImg = user.photo;

  if (typeof req.body.num !== "undefined" || req.body.num !== null) {
    imgNum = parseInt(req.body.num);
  }

  if (imgNum === 1) {
    img = req.body.img1;
    submission = await Submission.findOneAndUpdate(
      {
        userID: req.body.userID,
        testID: req.body.testID,
      },
      { img1: req.body.img1 }
    );
    submission.save();
  } else if (imgNum === 2) {
    img = req.body.img2;
    submission = await Submission.findOneAndUpdate(
      {
        userID: req.body.userID,
        testID: req.body.testID,
      },
      { img2: req.body.img2 }
    );
    submission.save();
  } else {
    img = req.body.img3;
    submission = await Submission.findOneAndUpdate(
      {
        userID: req.body.userID,
        testID: req.body.testID,
      },
      { img3: req.body.img3 }
    );
    submission.save();
  }

  const data = {
    api_key: "xQLsTmMyqp1L2MIt7M3l0h-cQiy0Dwhl",
    api_secret: "TyBSGw8NBEP9Tbhv_JbQM18mIlorY6-D",
    image_url1: userImg,
    image_base64_2: img,
  };

  request(
    {
      url: "https://api-us.faceplusplus.com/facepp/v3/compare",
      method: "POST",
      form: data,
    },
    async function (error, response, body) {
      const resData = JSON.parse(response.body);
      if (typeof resData.confidence !== "undefined") {
        if (resData.confidence < 60) {
          submission = await Submission.findOneAndUpdate(
            {
              userID: req.body.userID,
              testID: req.body.testID,
            },
            { doubt: true }
          );
          submission.save();
        }
      } else {
        submission = await Submission.findOneAndUpdate(
          {
            userID: req.body.userID,
            testID: req.body.testID,
          },
          { doubt: true }
        );
        submission.save();
      }
    }
  );
  res.status(201).json(submission);
});

exports.deleteSubmission = catchAsync(async (req, res, next) => {});
