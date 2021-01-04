const { Router } = require("express");
const testController = require("../controller/testController");
const authController = require("../controller/authController");

const router = Router();

router.post("/api/test/create", testController.createTest);
router.patch("/api/practice/:id", testController.addSolvedQues);

router.route("/api/tests").get(testController.getAllTests);
router.route("/api/servertime").get(testController.getTime);
router.route("/api/user/upcomingtests").get(testController.getUpcomingTests);
router.route("/api/admin/opentest/:id").patch(testController.openTest);

router.patch("/api/test/:id/addquestions", testController.addQuestions);

router.get("/api/test/netspeed", testController.testSpeed);
router.get("/api/testdata", testController.testData);
router.get("/api/practice", testController.getPracticeQues);

router.patch("/api/test/register/:id", testController.registerCandidate);

router
  .route("/api/tests/test/:id")
  .get(authController.protect, testController.getTest)
  .patch(testController.updateTest)
  .delete(testController.deleteTest);

module.exports = router;
