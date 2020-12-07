const mongoose = require("mongoose");
const request = require("request");

const answers = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
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
    totalScore: {
      type: Number,
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

answers.pre("save", async function (next) {
  this.timeTaken = Math.ceil(
    (this.submittedAt.getTime() - this.startedAt.getTime()) / 1000
  );
  // this.parent().totalScore = this.parent().totalScore + this.marksObtained;

  next();
});
submissionSchema.pre("save", async function (next) {
  for (let i = 0; i < this.answers.length; i++) {
    if (i === 0) {
      this.totalScore = this.answers[i].marksObtained;
    } else {
      this.totalScore += this.answers[i].marksObtained;
    }
  }
  next();
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
