var mongoose = require('mongoose');
	RoomSchema = mongoose.Schema({
		title: String,
		type: String
	}),

RoomModel = mongoose.model('room', RoomSchema); // user is the mongo collection name

module.exports = RoomModel;
	
