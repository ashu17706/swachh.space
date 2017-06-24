var Q = require('q');
var Helper = require('./../utils/helper');
var Master = require('./../models/master');
var fetch = require('node-fetch');
var forEach = require('async-foreach').forEach;

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

function getDataByDistance(req){
  var deferred = Q.defer();
  var query = Master.find({});
  query.limit(10);
  query.exec(function (err, docs) {
    if (err) {
      console.log('Error :' + err);
      deferred.reject(err);
    } else {
      console.log('Success');
      var result = [];
      forEach(docs, function(item, index) {
        // Continue in one second.
        var  lat = item.cor.lat;
        var long = item.cor.long;
        var promise = fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=17.3850,78.4867&destinations='+lat+','+long+'&key=AIzaSyA1u0VxVmXdP1JA-YFlb07at4TWp56TZoU')
        .then((data) => {
          return Q.defer(res.json());
        })
        result.push(promise);
      });

      Q.all(result).then(function(res) {
        console.log(res);
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
