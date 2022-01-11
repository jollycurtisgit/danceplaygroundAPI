//MongoDB
require("./models/db");

const express = require("express");
let app = express();

//Routes
require("./routes/JSroutes");

//Port
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`server has started on ${port}`);
});
