const express = require("express");
const { json } = require("body-parser");

const authRouter = require("./routes/authRoutes");
const testRouter = require("./routes/testRoutes");
const questionRouter = require("./routes/questionRoutes");
const submissionRouter = require("./routes/submissionRoutes");
const AppError = require("./utils/appError");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const fileUpload = require("express-fileupload");

const app = express();
app.use(json());

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(authRouter);
app.use(testRouter);
app.use(questionRouter);
app.use(submissionRouter);

app.all("*", async (req, res, next) => {
  next(new AppError(`Requested route ${req.path} not found`, 404));
});

app.use(errorHandler);

module.exports = app;
