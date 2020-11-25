const express = require("express");
const { json } = require("body-parser");

const authRouter = require("./routes/authRoutes");
const testRouter = require("./routes/testRoutes");
const questionRouter = require("./routes/questionRoutes");
const submissionRouter = require("./routes/submissionRoutes");
const AppError = require("./utils/appError");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(json());

app.use(authRouter);
app.use(testRouter);
app.use(questionRouter);
app.use(submissionRouter);

app.all("*", async (req, res, next) => {
  next(new AppError(`Requested route ${req.path} not found`, 404));
});

app.use(errorHandler);

module.exports = app;
