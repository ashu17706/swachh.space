// address.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Master = new Schema({
  // flag variable
  name: String,
  location: String,
  cor:{
      lat: { type: Number},
      long: { type: Number}
  },
  status: Number,
  timings: String,
  days: String,
  gender: Number,//1->male,2->female,3->both
  isPaid: Number,//1->yes,0->no,
  seatType:Number,//1->Indian,2->Western
  ratings:{
    hygiene:Number,
    userRating:Number
  }
}, { versionKey: false });

module.exports = mongoose.model('Master', Master);
