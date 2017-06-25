var Q = require('q');
var Helper = require('./../utils/helper');
var Master = require('./../models/master');
var fetch = require('node-fetch');

var searchService = {
  getAlldata: getAlldata,
  createRecord: createRecord,
  deleteAll:deleteAll,
  retrieveRecord:retrieveRecord,
  getDataByDistance:getDataByDistance
};

module.exports = searchService;

// --------------------------------------------------
//get all addresses list
function getAlldata(config) {
  var deferred = Q.defer();
  var query = Master.find({});
  query.limit(10);
  query.exec(function (err, docs) {
    if (err) {
      console.log('Error :' + err);
      deferred.reject(err);
    } else {
      console.log('Success');
      deferred.resolve(docs);
    }
  });
  return deferred.promise;
};

function createRecord(req) {
  var deferred = Q.defer();
  console.log('New request');
  var master = new Master();

  var req = req.body;
  master = Helper.mapRequestObject(req.master, master);
  master.cor = req.master.cor;
  master.ratings = req.master.ratings;
  master.save(function (err, docs) {
    if (err) {
      console.log('Error :' + err);
      deferred.reject(err);
    } else {
      console.log('Success:' + docs);
      deferred.resolve(docs);
    }
  }, function (err) {

    console.log('errr');
    deferred.reject(err);
  });

  return deferred.promise;
}

function retrieveRecord(req) {
  console.log('retrive by record id');
  var deferred = Q.defer();
  Master.findById(req.params.recordid, function (err, docs) {
    if (err) {
      console.log(err);
      deferred.reject(err);
    } else {
      console.log(docs);
      deferred.resolve(docs);
    }
  });

  return deferred.promise;
}

function getDataByDistance(req) {

  var deferred = Q.defer();

  console.log(req);
  if(Object.keys(req).length === 0 && req.constructor === Object){
    console.log('here');
    deferred.resolve([]);
    return deferred.promise;
  }
  var location = req.location;

  if(typeof location != "undefined"){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyC0EObQhjHFIPYrFuzGXEg9n7k6xz_7-XQ')
    .then(function(res) {
      console.log(res.json());
      return res.json();
    });
  }

  var glat = typeof req.lat == "undefined" ? 17.3850 :  req.lat;
  var glong = typeof req.long == "undefined" ? 78.4867 :  req.long;
  var query = Master.find({location:new RegExp(location, 'i')});
  query.exec(function (err, docs) {
    if (err) {
      console.log('Error :' + err);
      deferred.reject(err);
    } else {
      console.log('Success');
      var result = [];
      docs.forEach(function(item, i) {
        // Continue in one second.
        var lat = item.cor.lat;
        var long = item.cor.long;
        var promise = fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+glat+','+glong+'&destinations='+lat+','+long+'&key=AIzaSyA1u0VxVmXdP1JA-YFlb07at4TWp56TZoU')
        .then((data) => {
          var returned = data.json();
          //item.distance = returned.
          return returned;
        });
        result.push(promise);
      });

      Q.all(result).then(function(res) {
        docs.forEach(function(item, i) {
          res[i].docs = item;
          res[i].dvalue = res[i].rows[0].elements[0].distance.value;
          res[i].dtext = res[i].rows[0].elements[0].distance.text;
          delete res[i].rows;
        });
        return deferred.resolve(res);
      });
    }
  });
  return deferred.promise;
};

function deleteAll(req){
  var deferred = Q.defer();
  if (typeof (req.body.recordid) == 'undefined') {
    deferred.reject('Request must be in POST format, id should come in header');
    return deferred.promise;
  };

  var conditions = {
    _id: req.body.recordid,
  };

  var deferred = Q.defer();
  Master.remove(conditions, function (err, docs) {
    if (err) {
      console.log(err);
      deferred.reject(err);
    } else {
      console.log(docs);
      deferred.resolve(docs);
    }
  });

  return deferred.promise;
}
