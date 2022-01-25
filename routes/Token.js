const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = 'Anything'

module.exports.createAccessToken = (user) => {
	//we will identify the props/keys of the user that we want to verify
	const data = {
		id: user_id,
		email: user.email,
		isAdmin: user.isAdmin //to identify the role to determine restrictions.
	}
	return jwt.sign(data, secret, {})
}

verify = (req, res) => {
	let token = req.headers.authorization // authorization is a request header, commonly used for HTTP basic Authorization. It would set if the server requested authorization, and the browser then prompted the user for a username/password.
	if (typeof token != "undefined"){
		//if merong value na nakuha sa authorization prop.
		token.slice(7, token.length)//the token will be a string data type.
		//the number of characters that will be sliced off the string (token)
		//WHEN the JWT is generated it will include 7 additional characters to imclude additional security in tje access token.
		return jwt.verify(token, secret, (notMatch, match) => {
			return (notMatch) ?  res.send({auth: 'failed'}) : next()
			//next ay giangamit sa middleware, invoking the next() it will let the middleware process to the next function.
		})	
	}else{
		return res.send({auth: "failed"})
	}
}

//we created the following functions.
//-> a function to generate an access token via JWT with our secret word
decode = (token) => {
	if(typeof token !== 'undefined'){
		token = token.slice(7, token.length)
		return jwt.verify(token, secret, (err, data) => {
			return (err) ? null : jwt.decode(token, {
				complete: true
			}).payload // payload is anothr word for the word options.
		})
	}else{
		return null //developers choice to determine the response.. null is when data is properly identified but not given a value.
	}	
}
