var express = require('express')
	, routes = require('./routes');
var stormpath = require('express-stormpath');
var app = express();
//var socket = require('socket.io-client')('http://localhost');
var net = require('net');
/*var client = net.connect(8888,'128.237.169.237',function(){
	console.log('Connected');
});*/
var io = require('socket.io').listen(app.listen(3000));
/*client.on('data', function(data) {
  console.log(data.toString());
  io.emit('message', { message: data.toString() });
});*/
app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});
app.get('/showPatient/', routes.showPatient);
var enable="{\"type\" : \"request\",\"enableEvent\": true}";
var disable="{\"type\" : \"request\",\"enableEvent\": false}";
io.sockets.on('connection', function (socket) {
	console.log("CONNECTIONS");
	socket.on('enableJSON',function(){
		console.log("enable");
		client.write(enable);

	});
	socket.on('disableJSON',function(){
		client.write(disable);
	});
	

});

/*var mysql      = require('mysql');
var connection = mysql.createConnection({
  user     : 'root',
  password : 'root',
  host     : 'localhost:3306',
  database: 'Regrasp',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
 if(err){
 	console.log('db_connection_err',err);
 	return;
 }
  console.log("HI");
});
var post  = "select * from TestTable";
var query = connection.query(post, function(err, result) {
	if(err){
		console.log('db_connection_err',err);
	}else{
		console.log("this is result ",result);
	}
  // Neat!
});
//console.log(query.sql);
console.log("worked"); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
*/



