const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: [true, "Statement is required"],
    },
    type: {
      type: String,
    },
    category: {
      type: String,
    },
    marks: {
      type: Number,
      default: 5,
    },
    solW: {
      type: Number,
      default: 100,
    },
    testC1In: {
      type: String,
    },
    testC1Out: {
      type: String,
    },
    testC2In: {
      type: String,
    },
    testC2Out: {
      type: String,
    },
    testC3In: {
      type: String,
    },
    testC3Out: {
      type: String,
    },
    sampleIn: {
      type: String,
    },
    sampleOut: {
      type: String,
    },
    socW: {
      type: Number,
    },
    subT: {
      type: Number,
    },
    locW: {
      type: Number,
    },
    locT: {
      type: Number,
    },
    madeBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
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
