const express = require("express");
require("dotenv").config();
const configs = require("./configuartions/config");
const path= require('node:path')
const app = express();
const PORT_NUMBER = configs.PORT_NUMBER || 4600;

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.listen(PORT_NUMBER, () => {
  console.log(`URL of App is http://localhost:${PORT_NUMBER}`);
});

app.get('/',(req,res)=>{
    res.render('home')
})
