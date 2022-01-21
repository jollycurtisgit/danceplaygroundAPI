const express = require("express");
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const MongoUtil = require('./MongoUtil') 

const MONGO_URI = process.env.MONGO_URI
let app = express();
app.use(cors())
app.use(express.json());


//------------Pattern
let classes = [
  {
    id: 1,
    name: "Zumba",
    location: "NorthWood Village",
    price: "P50",
    schedule: "every Monday, 3PM",
    link: "https://th.bing.com/th/id/OIP.ZbhLxJ7w_iAzsUWRfMzbGAAAAA?pid=ImgDet&rs=1"
  }
];


app.post("/add.class", function (req, res) {
  const postAclass = {
    id: classes.length + 1,
    name: req.body.name,
    location: req.body.location,
    price: req.body.price,
    schedule: req.body.schedule,
    link: req.body.link,
  };
  classes.push(postAclass);
  res.send(postAclass);
});
app.put("/edit.class/:id", function (req, res) {
  let findAclass = classes.find((c) => c.id === parseInt(req.params.id));
  if (!findAclass)
    return res.status(404).send("The class with that id was not found");
  findAclass.name = req.body.name;
  findAclass.location = req.body.location;
  findAclass.price = req.body.price;
  findAclass.schedule = req.body.schedule;
  findAclass.link = req.body.link,
  res.send(findAclass);
});

app.delete("/delete.class/:id", function (req, res) {
  let findAclass = classes.find((c) => c.id === parseInt(req.params.id));
  if (!findAclass)
    return res.status(404).send("The class with that id was not found");  
  const index = classes.indexOf(findAclass);
  //res.send(index);
  classes.splice(index, 1);
  res.send(findAclass);
});

//------------Pattern
let signUp = [
  {
    accountNum: 1,
    fName: "Jolly",
    lName: "Chua",
    userName: "JChua15",
    email: "jolly_chua@email.com",
    password: "Orayt156"
  }
];

//------------Pattern
let login = [];
//================== Routes for const signUp
app.post("/members", function (req, res) {
  const postAmember = {
    accountNum: signUp.length + 1,
    fName: req.body.fName,
    lName: req.body.lName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    password_confirm: req.body.password_confirm,
  };
  signUp.push(postAmember);
  res.send(postAmember);
});

app.post("", function (req, res) {
  const postAmember = {
    accountNum: login.length + 1,
    email: req.body.email,
    password: req.body.password
  };
  login.push(postAmember);
  res.send(postAmember);
});
app.get("", function (req, res) {
  res.send(login);
});


app.get("/members", function (req, res) {
  res.send(signUp);
});
app.get("/member/:email", function (req, res) {
  let findAmember = signUp.find((c) => c.email === req.params.email);
  if (!findAmember)
    return res.status(404).send("The class with that id was not found");
  res.send(findAmember);
});

app.put("/editAccount/:email", function (req, res) {
  let findAmember = signUp.find((c) => c.email === req.params.email);
  if (!findAmember)
    return res.status(404).send("The member with that email was not found");
  findAmember.fName = req.body.fName;
  findAmember.lName = req.body.lName;
  findAmember.userName = req.body.userName;
  findAmember.email = req.body.email;
  findAmember.password = req.body.password;
  res.send(findAmember);
});
app.delete("/deleteAccount/:accountNum", function (req, res) {
  let findAmember = signUp.find((c) => c.accountNum === parseInt(req.params.accountNum));
  if (!findAmember)
    return res.status(404).send("The member with that email was not found");
  const index = signUp.indexOf(findAmember);
  res.send(index);
  classes.splice(index, 1);
  res.send(findAmember);
});

async function main(){
  await MongoUtil.connect(MONGO_URI, "danceplaygroundAPI");
  app.get("", async function (req, res) {
    const db = MongoUtil.getDB();
    let classes = await db.collection('classes').find().toArray();
    res.send(classes);
  });

   // working - Display all added classes  
  app.get("/AddClasses", async function (req, res) {
    const db = MongoUtil.getDB();
    let classRecords = await db.collection('classes').find({}).toArray();
    res.send(classRecords);
  });

  // working - Add a class
  app.post("/AddClasses", async function (req, res) {
    const postAclass = {
      id: classes.length + 1,
      name: req.body.name,
      location: req.body.location,
      price: req.body.price,
      schedule: req.body.schedule,
      link: req.body.link,
    };
    const db = MongoUtil.getDB();
    await db.collection('classes').insertOne(postAclass)
    res.send(classes);
  });

  app.get("/class/:id", async function (req, res) {
    let id = req.params.id
    const db = MongoUtil.getDB();
    let ID = classes.find((c) => c._id === parseInt(req.params._id));
    let findAclass = await db.collection('classes').findOne({
      '_id': ObjectId(id)
    });
    if (!findAclass)
      return res.status(404).send("The class with that id was not found");
    res.send(findAclass);
  });
}

main()
//---------------Port
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`server has started on local host/port ${port}`);
});