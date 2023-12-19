const { Router } = require("express");
const UserModel = require("../models/userModel");

const userRouter = Router();
userRouter.post("/signin", async (req, res) => {
  try {
    const token = await UserModel.matchPasswordandCreateToken(
      req.body.email,
      req.body.password
    );
    console.log("token", token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect Email or Password" });
  }
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

userRouter.get('/logout',async(req,res)=>{
  res.clearCookie('token').redirect('/')
})

module.exports = userRouter;
