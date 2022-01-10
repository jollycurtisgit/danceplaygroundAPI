require('./models/db');

const express = require('express')
let app = express();

//Routes

app.get('/hello', function(req, res) {
    res.send("Hello World! Orayt!")
})

app.get('', function(req, res) {
    res.send("Hello Jolly!")
})

app.listen(3000, function(){
    console.log("server has started")
})



