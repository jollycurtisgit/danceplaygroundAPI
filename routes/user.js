const express = require('express');
const router = express.Router()
const UserController = require('../controllers/user')
//lets identify the needed dependencies to create our routes
const Token = require('./Token')


//register a new user
router.post('/register', (req, res) => {
    UserController.register(req.body).then(result => res.send(result));
  })
  
//lets create a route for our login method.
router.post('/login', (req, res) => {
	UserController.login(req.body).then(result => res.send(result))
})

module.exports = router;