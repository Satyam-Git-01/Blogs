const userRouter = require("express").Router();
const {
  renderSigIn,
  renderSignUp,
  handleSignUp,
  handleSignIn,
  handleLogout,
} = require("../controllers/userController");

userRouter.get("/signup", renderSignUp);
userRouter.get("/signin", renderSigIn);
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);
userRouter.get("/logout", handleLogout);

module.exports = userRouter;
