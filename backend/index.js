// index.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000

var cors = require('cors')

// DB and Schema settings
require('./app/models/db');

var userapp = require('./app/routers/searchapp');
var fetchapp = require('./app/routers/fetchapp');

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', [fetchapp, userapp]);

var server = app.listen(PORT, function () {
  console.log('Swachh server started & running on port: ' + PORT);
});

module.exports = server;
