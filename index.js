const express = require("express");
const cors = require('cors')

//------------MongoDB
require("./models/db");

let app = express();
app.use(cors())
app.use(express.json());

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

//--------------Routes for const classes
//require("./routes/JSroutes.js");
app.get("/classes", function (req, res) {
  res.send(classes);
});

app.get("/classes/:id", function (req, res) {
  let findAclass = classes.find((c) => c.id === parseInt(req.params.id));
  if (!findAclass)
    return res.status(404).send("The class with that id was not found");
  res.send(findAclass);
});

app.get("", function (req, res) {
  res.send("Hello Jolly!");
});

app.post("/classes", function (req, res) {
  const postAclass = {
    id: classes.length + 1,
    name: req.body.name,
    location: req.body.location,
    price: req.body.price,
    schedule: req.body.schedule
  };
  classes.push(postAclass);
  res.send(postAclass);
});

app.put("/classes/:id", function (req, res) {
  let findAclass = classes.find((c) => c.id === parseInt(req.params.id));
  if (!findAclass)
    return res.status(404).send("The class with that id was not found");
  findAclass.name = req.body.name;
  findAclass.location = req.body.location;
  findAclass.price = req.body.price;
  findAclass.schedule = req.body.schedule;
  res.send(findAclass);
});

app.delete("/classes/:id", function (req, res) {
  let findAclass = classes.find((c) => c.id === parseInt(req.params.id));
  if (!findAclass)
    return res.status(404).send("The class with that id was not found");
  const index = classes.indexOf(findAclass);
  res.send(index);
  classes.splice(index, 1);
  res.send(findAclass);
});

//------------Pattern
const signUp = [
  {
    fName: "Jolly",
    lName: "Chua",
    email: "jolly_chua@email.com"
  }
];

//================== Routes for const signUp

app.post("/signUp", function (req, res) {
  const postAmember = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
  };
  signUp.push(postAmember);
  res.send(postAmember);
});

app.get("/members", function (req, res) {
  res.send(signUp);
});

app.put("/editAccount/:email", function (req, res) {
  let findAmember = signUp.find((c) => c.email === req.params.email);
  if (!findAmember)
    return res.status(404).send("The member with that email was not found");
  findAmember.fName = req.body.fName;
  findAmember.lName = req.body.lName;
  findAmember.email = req.body.email;
  res.send(findAmember);
});

app.delete("/deleteAccount/:email", function (req, res) {
  let findAmember = signUp.find((c) => c.email === req.params.email);
  if (!findAmember)
    return res.status(404).send("The member with that email was not found");
  const index = signUp.indexOf(findAmember);
  res.send(index);
  classes.splice(index, 1);
  res.send(findAmember);
});


//---------------Port
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`server has started on port ${port}`);
});
