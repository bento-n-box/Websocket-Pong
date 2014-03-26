
/**
 * Module dependencies.
 */

var express = require('express')
  , route = require('./config/route')
  , http = require('http')
  , path = require('path')
  , app = express()
  , mongoose =  require('mongoose')
  , mongoStore = require('connect-mongo')(express)
  , logfmt = require("logfmt")
  ;

var app = express();
app.use(logfmt.requestLogger());

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '/public')));
  
  app.locals.title ="NodePong";
});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/nodePong');
});


route(app)

var server = http.createServer(app)
var io = require('socket.io').listen(server);
var RoomModel = require('./models/roommodel');


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

	
var clients = { // Object to store player data
	'player1': {
		'position': 'open',	
		'playerID': 0	
		},
	'player2': {
		'position': 'open',	
		'playerID': 0
		}
	};


var MobilePlayer;
var roomID;
io.sockets.on('connection', function(socket,data){
	socket.emit('connected', {message: 'Connected to NodePong!', from: "System"});
	
	
	socket.on('player1', function(){
		clients.player1.position = 'closed';
		clients.player1.playerID = socket.id;
		countPlayers();
		
	})
	socket.on('player2', function(){
		clients.player2.position = 'closed';
		clients.player2.playerID = socket.id;
		countPlayers();
	})

	countPlayers = function(){
		console.log('countPlayer', clients);
		socket.broadcast.to(roomID).emit('clients', {clients: clients});	
	}	
	countPlayers();
	if(roomID){		
		socket.on('paddleLocation', function(data, MobilePlayer){
			socket.broadcast.to(roomID).emit('sendPaddledata', {data:data});
		});	
	}
	
	socket.on('join', function (data, ball) {
	    RoomModel.findById(data.room, 'title', function(err, room){
	    	if(!err && data.room){
		    	socket.join(room._id);
		    	roomID = room._id 	
		    }		
		}); // End RoomModel 
		countPlayers();
	}); // End  Join
	
	
	socket.on('leave', function (data, MobilePlayer) { 
		RoomModel.findById(data.room, 'title', function(err,room){
			if(!err && data.room){
				socket.leave(room._id);
			}
		})
		
		if(socket.id === clients.player1.playerID){
			clients.player1.position = 'open';
			clients.player1.playerID = 0;	
		}
		if(socket.id === clients.player2.playerID){
			clients.player2.position = 'open';
			clients.player2.playerID = 0;
		}
		countPlayers();
	});
	socket.on('newGame', function(){
		socket.broadcast.emit('newGameMobile');
		clients.player1.position = 'open';
		clients.player1.playerID = 0;
		clients.player2.position = 'open';
		clients.player2.playerID = 0;
		countPlayers();		
	})
	socket.on('playerbacks', function(data ){ // Check if player presses back in browser
		if(socket.id === clients.player1.playerID){
			clients.player1.position = 'open';
			clients.player1.playerID = 0;	
		}
		if(socket.id === clients.player2.playerID){
			clients.player2.position = 'open';
			clients.player2.playerID = 0;
		}
		countPlayers();
	});
	
	socket.on('disconnect', function (data, ball, MobilePlayer) { 
		if(socket.id === clients.player1.playerID){
			clients.player1.position = 'open';
			clients.player1.playerID = 0;	
		}
		if(socket.id === clients.player2.playerID){
			clients.player2.position = 'open';
			clients.player2.playerID = 0;
		}
		countPlayers();
	});
	
}); // End Connection

