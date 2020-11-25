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

const questionsSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: true,
    },
    testCases: [testCase],
    alottedMarks: {
      type: Number,
      required: [true, "Question must have marks"],
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

const Question = mongoose.model("Question", questionsSchema);

module.exports = Question;
