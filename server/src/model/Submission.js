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
      ref: "User",
      required: true,
    },
    answers: [answers],
    totalScore: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "absent",
    },
    doubt: {
      type: Boolean,
      default: false,
    },
    img1: {
      type: String,
      default:
        "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    },
    img2: {
      type: String,
      default:
        "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    },
    img3: {
      type: String,
      default:
        "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
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
  console.log("------");
  console.log(this.parent().status);
  if (this.parent().status === "violated") {
    this.parent().status = "violated";
  } else {
    this.parent().status = "present";
  }
  console.log(this.parent().status);
  console.log("------");
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
