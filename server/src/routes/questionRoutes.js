const { Router } = require("express");
const mongoose = require("mongoose");
const questionController = require("../controller/questionController");

const router = Router();

router.post("/api/question/create", questionController.createQuestion);

router.route("/api/questions/:id").get(questionController.getQuestion);
router.route("/api/questions").get(questionController.getAllQuestions);

router
  .route("/api/questions/Question/:id")
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

router.post("/api/run", questionController.runCode);

module.exports = router;
