var express = require('express');
var stormpath = require('express-stormpath');
var app = express();
var http = require('http').Server(app);
//var socket = require('socket.io-client')('http://localhost');
var net = require('net');
/*var client = net.connect(4000,'localhost');
client.write("connected");
client.on('data', function(data) {
  console.log(data.toString());
  client.end();
});*/
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'jade');


//app.use(stormpathMiddleware);

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});
var mysql      = require('mysql');
var connection = mysql.createConnection({
  user     : 'root',
  password : 'root',
  host     : 'localhost:3306',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
 if(err){
 	console.log('db_connection_err',err);
 	return;
 }
  console.log("HI");
});
var post  = {"select * from TestTable"};
var query = connection.query(post, function(err, result) {
	if(err){
		console.log('db_connection_err',err);
	}
  // Neat!
});
//console.log(query.sql);
console.log("worked"); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
app.listen(3000);
/*// Add a connect listener
socket.on('connect',function() {
  console.log('Client has connected to the server!');
});
// Add a connect listener
socket.on('event',function() {
  console.log('Received a message from the server!',data);
});
// Add a disconnect listener
socket.on('disconnect',function() {
  console.log('The client has disconnected!');
});

*/

