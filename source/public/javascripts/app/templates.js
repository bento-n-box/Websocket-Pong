window.Application.Templates=(function () { 

var jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

 var templates = {};

templates["pages/partial.mobileroom.jade"] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<script src="http://debug.phonegap.com/target/target-script-min.js#accelerometer"></script><script src="/javascripts/mobilepaddle.js"></script><body><div id="mobileContent"><div class="logo"><img src="/images/cp+b-logo.gif"/></div><h2>Welcome to CP+B Pong</h2><div class="buttons"><button id="player1" class="super-button">Join as Player 1</button><button id="player2" class="super-button">Join as Player 2</button></div></div><div id="roomsClosed"><h2>Waiting for open position...</h2></div><div id="mobileControls"></div><div id="player"></div><div id="power"></div><div id="paddlePosition"></div></body>');
}
return buf.join("");
}

templates["pages/partial.room.jade"] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<script src="/javascripts/pong.js"></script><div id="room"></div><div id="canvas"><canvas id="paper" width="900" height="475" style="margin: 50px auto; display: block;"></canvas><div id="score"><span id="p1_scr">0</span><span id="p2_scr">0</span></div><span id="countdown"></span><span id="winner"></span><div id="instructions"><ul id="geturl"><li>GO HERE A ON MOBILE DEVICE: </li><li id="link">goo.gl/lMJp6o <div id="player1" class="currentPlayers"></div><div id="player2" class="currentPlayers"></div></li></ul></div></div><footer><h2>Node Pong</h2></footer>');
}
return buf.join("");
}

templates["pages/partial.rooms.jade"] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1>Welcome to NodePong</h1><ul>');
// iterate rooms
;(function(){
  if ('number' == typeof rooms.length) {

    for (var $index = 0, $$l = rooms.length; $index < $$l; $index++) {
      var room = rooms[$index];

buf.push('<li class="rooms"><a');
buf.push(attrs({ 'href':("#!" + (room._id) + "") }, {"href":true}));
buf.push('>' + escape((interp = room.title) == null ? '' : interp) + '</a></li>');
    }

  } else {
    var $$l = 0;
    for (var $index in rooms) {
      $$l++;      var room = rooms[$index];

buf.push('<li class="rooms"><a');
buf.push(attrs({ 'href':("#!" + (room._id) + "") }, {"href":true}));
buf.push('>' + escape((interp = room.title) == null ? '' : interp) + '</a></li>');
    }

  }
}).call(this);

buf.push('</ul><footer><h2>Node Pong</h2></footer>');
}
return buf.join("");
}

  return templates;

})();