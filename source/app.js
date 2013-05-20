
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
  ;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
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

/*
 io.configure(function () { 
	  io.set("transports", ["xhr-polling"]); 
	  io.set("polling duration", 10); 
	});
*/

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

	
var clients = {
	'player1': {
		'position': 'open',	
		'playerID': 0	
		},
	'player2': {
		'position': 'open',	
		'playerID': 0
		}
}

var players = [];

var MobilePlayer;

io.sockets.on('connection', function(socket){
	socket.emit('connected', {message: 'Connected to NodePong!', from: "System"});
	
	socket.on('player1', function(){
		clients.player1.position = 'closed';
		clients.player1.playerID = socket.id;
		
	})
	socket.on('player2', function(){
		clients.player2.position = 'closed';
		clients.player2.playerID = socket.id;
	})
	
	countUsers = function(){
		console.log(clients);
		socket.broadcast.emit('clients', {clients: clients})
		
	}	
	setInterval(countUsers, 1000);
	
	socket.on('paddleLocation', function(data, room, MobilePlayer){
		socket.broadcast.emit('sendPaddledata', {data:data});
	});	
	socket.on('join', function (data, ball) {
	console.log(socket.id);
	    RoomModel.findById(data.room, 'title', function(err, room){
	    	if(!err && data.room){
		    	socket.join(room._id);
		    	console.log('joined'); 	
		    	
		    }		
		}); // End RoomModel
	}); // End  Join
	
	socket.on('leave', function (data, MobilePlayer) { 
		console.log('==================LEAVE    LEAVE=======================')
		RoomModel.findById(data.room, 'title', function(err,room){
			console.log(data);
			if(!err && data.room){
				socket.leave(room._id);
			}
		})
		if (data.MobilePlayer == 1){
			clients.player1 = 'open';
		}
		if (data.MobilePlayer == 2){		
			clients.player2 = 'open';
		}
	});
	socket.on('newGame', function(){
		socket.broadcast.emit('newGameMobile');
		clients.player1 = 'open';
		clients.player2 = 'open';	
	})
	
	
	socket.on('disconnect', function (data, ball, MobilePlayer) { 
		console.log(socket.id);
		
		if(socket.id === clients.player1.playerID){
			clients.player1.position = 'open';
			clients.player1.playerID = 0;
			
		}
		if(socket.id === clients.player2.playerID){
			clients.player2.position = 'open';
			clients.player2.playerID = 0;
			
		}
		
	});
	
	
}); // End Connection

