const mongoose = require("mongoose");

const answers = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.ObjectId,
    },
    statement: {
      type: String,
    },
    startedAt: {
      type: Date,
    },
    submittedAt: {
      type: Date,
      default: Date.now(),
    },
    timeTaken: {
      type: Number,
    },
    lineOfCode: {
      type: Number,
    },
    code: {
      type: String,
    },
    tcOneOut: {
      type: String,
    },
    tcTwoOut: {
      type: String,
    },
    tcThreeOut: {
      type: String,
    },
    marksObtained: {
      type: Number,
    },
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    testID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    answers: [answers],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

answers.pre("save", async function (next) {
  this.timeTaken = Math.ceil(
    (this.submittedAt.getTime() - this.startedAt.getTime()) / 1000
  );

  next();
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
