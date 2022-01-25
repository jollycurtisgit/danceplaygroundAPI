const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    mobileNo: {
        type: String
    },
    password: {
        type: String
    }
})

mongoose.model('User', studentSchema);