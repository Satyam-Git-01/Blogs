const { Router } = require("express");
const UserModel = require("../models/userModel");

const userRouter = Router();
userRouter.post("/signin", async (req, res) => {
  const result = await UserModel.matchPassword(req.body.email, req.body.password);
  console.log(result);
  return res.render("signin");
});

userRouter.get("/signin", async (req, res) => {
  return res.render("signin");
});

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const result = await UserModel.create({ fullname, email, password });
  } catch (error) {
    console.log(error);
  }
  return res.render("signup");
});
module.exports = userRouter;
