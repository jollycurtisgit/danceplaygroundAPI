const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lasttName: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    village: {
        type: String
    }
})

mongoose.model('student', studentSchema);