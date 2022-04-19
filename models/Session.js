const mongoose = require("mongoose")

const schema = mongoose.Schema({
	time: String,
	guid: String
})

module.exports = mongoose.model("Session", schema)