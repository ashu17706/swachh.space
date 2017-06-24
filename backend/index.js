// index.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000;

// DB and Schema settings
require('./app/models/db');

var userapp = require('./app/routers/searchapp');

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', [userapp]);

var server = app.listen(PORT, function () {
  console.log('Swachh server started & running on port: ' + PORT);
});

module.exports = server;
