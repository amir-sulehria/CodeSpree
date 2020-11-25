const mongoose = require("mongoose");

const testCase = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    stdin: {
      type: String,
    },
    expectedOutput: {
      type: String,
    },
    generatedOutput: {
      type: String,
      default: null,
    },
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

const answers = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.ObjectId,
  },
  statement: {
    type: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now(),
  },
  testCases: [testCase],
  marksObtained: {
    type: Number,
  },
});

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

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
