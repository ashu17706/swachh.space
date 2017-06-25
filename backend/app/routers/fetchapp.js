//userapp.js
var express = require('express');
var Q = require('q');
var router = express.Router();
var fetch = require('node-fetch');
var each = require('foreach');
var rando = require('random-number-in-range');
var Master = require('./../models/master');
//get all user list
router.get('/fetch', function (req, res) {
  console.log('fetch google api');
  var query = "bus stands";
  var promise = fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=17.3850,78.4867&radius=50000&name='+query+'&key=AIzaSyC0EObQhjHFIPYrFuzGXEg9n7k6xz_7-XQ')
  .then(function(res) {
    var deferred = Q.defer();
    deferred.resolve(res.json());
    return deferred.promise;
  });

  promise.then(function (data) {
    var i=0;

    each(data.results,function (obj, key, array) {
      var name = obj.name;
      var cor = obj.geometry.location;
      var rating = obj.rating;
      var master = new Master();
      master.name = obj.name;
      master.location= obj.vicinity;
      master.cor = {
          lat:obj.geometry.location.lat,
          long:obj.geometry.location.lng
      };
      master.status = 1;
      master.timings= "9:00 am to 9:00 pm";
      master.gender= rando(1, 3);//1->male,2->female,3->both
      master.isPaid= rando(1, 0);//1->yes,0->no,
      master.seatType=rando(1, 2);//1->Indian,2->Western
      master.ratings={
          hygiene:rando(1, 5),
          userRating:typeof(obj.rating) == "undefined" ? "2" : obj.rating
      };

      master.save(function (err, docs) {
        if (err) {
          console.log('Error :' + err);
        } else {
          i++;
          console.log(i+" data feeded");
        }
      }, function (err) {
        console.log('errr');
      });

    });

    res.json({ error: false, message:'data feeded'});
  }, function (error) {

    res.json({ error: true, message: error });
  });
});

module.exports = router;
