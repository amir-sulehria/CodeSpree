const { Router } = require("express");
const submissionController = require("../controller/submissionController");

const router = Router();

router.post("/api/submission/create", submissionController.createSubmission);
router.patch("/api/submission/addanswer", submissionController.addAnswer);
router.patch("/api/user/cancel/:id", submissionController.cancelTest);

router.route("/api/submissions").get(submissionController.getAllSubmissions);
router.route("/api/submission/getscore").get(submissionController.getScore);
router
  .route("/api/submission/getranking/:id")
  .get(submissionController.getRanking);

router
  .route("/api/submission/updatestatus/:id")
  .patch(submissionController.updateSubStatus);

router
  .route("/api/submissions/submission/:id")
  .get(submissionController.getSubmission)
  .patch(submissionController.updateSubmission)
  .delete(submissionController.deleteSubmission);

module.exports = router;
