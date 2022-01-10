const mongoose = require('mongoose');

mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas!"))
mongoose.connect("mongodb+srv://admin:password123!@sandbox.g3stu.mongodb.net/danceplaygroundAPI?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})