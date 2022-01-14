

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
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