const express = require("express");
require("dotenv").config();
const configs = require("./configuartions/config");
const app = express();
const PORT_NUMBER = configs.PORT_NUMBER || 4600;


app.listen(PORT_NUMBER, () => {
  console.log(`URL of App is https://localhost:${PORT_NUMBER}`);
});
