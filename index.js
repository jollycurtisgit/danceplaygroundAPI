//------------MongoDB
require("./models/db");

const express = require("express");
let app = express();

//--------------Routes
require("./routes/JSroutes.js");

//------------Pattern
const classes = [
  {
    id: 1,
    name: "Zumba",
    location: "NorthWood Village",
    price: "P50",
    schedule: "every Monday, 3PM"
  }
];

app.get("/classes", function (req, res) {
  res.send(classes);
});

app.get("/classes/:id", function (req, res) {
  let findAclass = classes.find((c) => c.id === parseInt(req.params.id));
  if (!findAclass) res.status(404).send("The class with that id was not found");
  res.send(findAclass);
});

app.get("", function (req, res) {
  res.send("Hello Jolly!");
});

app.post;

//---------------Port
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`server has started on ${port}`);
});
