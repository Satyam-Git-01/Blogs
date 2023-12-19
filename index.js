const express = require("express");
const Mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const configs = require("./configuartions/config");
const path = require("node:path");
const userRouter = require("./routes/userRouter");
const {
  checkforAuthenticationCookie,
} = require("./middlewares/authentication");
const app = express();
const PORT_NUMBER = configs.PORT_NUMBER || 4600;

//app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthenticationCookie("token"));


app.listen(PORT_NUMBER, () => {
    console.log(`URL of App is http://localhost:${PORT_NUMBER}`);
});

Mongoose.connect(configs.CONNECTION_STRING)
.then((response) => {
    console.log("Database connection successfull!");
})
.catch((err) => {
    console.log("Error while connection DB");
});



app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
