// db.js

var mongoose = require('mongoose');

//change db according to enviroment
var config = require('./../config/db');
if (typeof (process.env.NODE_ENV) === 'undefined') {
  process.env.NODE_ENV = 'development';
}

//process.env.NODE_ENV = 'staging';
console.log(process.env.NODE_ENV);

// connection to the MongoDB instance
var dbURI = config.mongoURI[process.env.NODE_ENV];
mongoose.connect(dbURI);

// on successful connection
mongoose.connection.on('connected', function () {
  console.log('Mongoose Default Connection open to Swachh DB');
  console.log(dbURI);
});

// on error while connection
mongoose.connection.on('error', function () {
  console.log('Mongoose Default connection has some problem connection to Swachh DB');
  console.log(dbURI);
  process.exit();
});

//if node process end
process.on('SIGINT', function () {

  // close the mongoose connection
  mongoose.connection.close(function () {
    console.log('Mongoose Default connection ended because server termination');
    console.log('Bye Bye!! Have a Nice Day');
    process.exit();
  });
});
