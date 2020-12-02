const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    registeredUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
      },
    ],
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

testSchema.pre(/^find/, function (next) {
  this.populate({
    path: "Question",
  });

  next();
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
