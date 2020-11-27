const { Router } = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");

const authRouter = Router();

authRouter.post("/api/users/signup", authController.signup);
authRouter.get("/api/users/checkauth", authController.isAuthenticated);
authRouter.post("/api/users/signin", authController.login);
authRouter.post("/api/staff/signin", authController.login);
authRouter.get("/api/users/signout", authController.signout);
authRouter.post("/api/users/signin", authController.forgotPassword);
authRouter.post("/api/users/signout", authController.resetPassword);

authRouter.patch(
  "/api/users/update-my-password",
  authController.protect,
  authController.updatePassword
);

authRouter.patch(
  "/api/users/update-me",
  authController.protect,
  userController.updateMe
);

authRouter.delete(
  "/api/users/delete-me",
  authController.protect,
  userController.deleteMe
);

authRouter
  .route("/api/users")
  .get(userController.getAllUsers)
  .post(userController.createUser);

authRouter
  .route("/api/users/user/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = authRouter;
