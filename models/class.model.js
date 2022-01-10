const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
	},
	isActive: {
		type: Boolean,
		default: true
	},
	enrollees:{
		type: string,
	}
})

mongoose.model('class', classSchema)
