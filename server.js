//server.js
'use strict'
//first we import our dependencies…
require('dotenv').config()
var express = require('express');
var connection  = require('express-myconnection');
var app = express();
var expressValidator = require('express-validator');
var path = require('path');
var port = process.env.API_PORT || 3001;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var routes = require('./app/routes/api');

var HOST = process.env.SQLHOST
var USER = process.env.SQLUSER;
var PASSWD = process.env.PASSWD
var DATABASE = process.env.SQLDB
var PORT = process.env.SQLPORT

app.use(connection(mysql,{
  host     : HOST,
  user     : USER,
  password : PASSWD,
  port     : PORT,
  database : DATABASE
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
//app.use(express.static(__dirname + '/public')); // Allow front end to access public folder
//app.use('/bower_components',  express.static(__dirname + '/bower_components'));
//app.use('/node_modules',  express.static(__dirname + '/node_modules'));

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

app.use('/', routes);

//now we can set the route path & initialize the API
/*
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});
*/
//starts the server and listens for requests
app.listen(port, function() {
 console.log('Your server is running on port ' + port);
});