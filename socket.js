var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('tmp/index.html');
});

app.get('/index.js', function(req, res){
  res.sendfile('tmp/index.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('data', function(msg){
    console.log('message: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});