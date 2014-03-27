var mongoose = require('mongoose');
	RoomSchema = mongoose.Schema({
		title: String,
		type: String
	}, {
  
    collection : 'nodePong',
  }),

RoomModel = mongoose.model('room', RoomSchema); // user is the mongo collection name

module.exports = RoomModel;
	
