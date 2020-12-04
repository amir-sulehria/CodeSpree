const { Router } = require("express");
const testController = require("../controller/testController");

const router = Router();

router.post("/api/test/create", testController.createTest);

router.route("/api/tests").get(testController.getAllTests);
router.route("/api/user/upcomingtests").get(testController.getUpcomingTests);

router.patch("/api/test/:id/addquestions", testController.addQuestions);

router.patch("/api/test/register/:id", testController.registerCandidate);

router
  .route("/api/tests/test/:id")
  .get(testController.getTest)
  .patch(testController.updateTest)
  .delete(testController.deleteTest);

module.exports = router;
