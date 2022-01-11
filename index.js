//MongoDB
require('./models/db');

const express = require('express')
let app = express();

//Routes
require('./routes/JSroutes');


app.listen(3000, function(){
    console.log("server has started")
})



