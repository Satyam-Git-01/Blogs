const UserModel =require('../models/userModel')
const renderSigIn = (req, res) => {
  return res.render("signin");
};
const renderSignUp = (req, res) => {
  return res.render("signup");
};

const handleSignUp = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const result = await UserModel.create({ fullname, email, password });
  } catch (error) {
    console.log(error);
  }
  return res.render("signup");
};

const handleSignIn = async (req, res) => {
  try {
    const token = await UserModel.matchPasswordandCreateToken(
      req.body.email,
      req.body.password
    );
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect Email or Password" });
  }
};

const handleLogout = (req, res) => {
  return res.clearCookie("token").redirect("/");
};
module.exports = {
  renderSigIn,
  renderSignUp,
  handleSignUp,
  handleSignIn,
  handleLogout
};
