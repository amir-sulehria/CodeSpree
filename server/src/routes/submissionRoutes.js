const { Router } = require("express");
const submissionController = require("../controller/submissionController");

const router = Router();

router.post("/api/submission/create", submissionController.createSubmission);

router.route("/api/submissions").get(submissionController.getAllSubmissions);

router
  .route("/api/submissions/submission/:id")
  .get(submissionController.getSubmission)
  .patch(submissionController.updateSubmission)
  .delete(submissionController.deleteSubmission);

module.exports = router;
