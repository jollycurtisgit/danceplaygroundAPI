const express = require("express");
let app = express();

app.get("/hello", function (req, res) {
  res.send("Hello World! Orayt!");
});

app.get("", function (req, res) {
  res.send("Hello Jolly!");
});
