const express = require("express");
const Mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const configs = require("./configuartions/config");
const path = require("node:path");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const {
  checkforAuthenticationCookie,
} = require("./middlewares/authentication");
const BlogModel = require("./models/blogModel");
const app = express();
const PORT_NUMBER = configs.PORT_NUMBER || 4600;
const CONNECTION_STRING = configs.CONNECTION_STRING;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthenticationCookie("token"));

app.listen(PORT_NUMBER, () => {
  console.log(`URL of App is http://localhost:${PORT_NUMBER}`);
});

Mongoose.connect(CONNECTION_STRING)
  .then((response) => {
    console.log("Database connection successfull!");
  })
  .catch((err) => {
    console.log("Error while connecting DB");
  });

app.use("/user", userRouter);
app.use("/blog", blogRouter);

//show blogs on indexpage
app.get("/", async (req, res) => {
  const blogs = await BlogModel.find({});
  res.render("home", { user: req.user, blogs: blogs });
});
