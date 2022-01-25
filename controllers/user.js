const User = require('../index.js')// lets acquire the needed dependencies.
const bcrypt = require('bcrypt')
const auth = require('../routes/Token.js');

//create function that will allow us to register a new user.
module.exports.register = (params) => {
	let user = new User({
	firstName: params.firstName,
	lastName: params.lastName,
	email: params.email,
	mobileNo: bcrypt.hashSync(params.mobileNo, 8),
	password: bcrypt.hashSync(params.password, 10)		
	})
	return user.save().then((user, err) => {
		return (err) ? false : true
	}) //lets create a promise that will determine the return upon success or failure in saving a new entry.
}


module.exports.login = (params) => {
    return User.findOne({email: params.email}).then(user => {
      //upon getting the email parameter of the user, the entered data has to pass the following requirements.
        if(user === null) {return false}
      //if the email exist continue the process by checking if the passwords match each other.
        const isPasswordMatched = bcrypt.compareSync(params.password, user.password)
        
        if(isPasswordMatched){
            return {access: auth.createAccessToken()}
        } else { //why did we convert the document to an object()? because the document that we will receive fromt eh db is injson format. Hindi ma access dahil cannot be parsed.
            return false;
        }
    })
};