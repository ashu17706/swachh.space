//userapp.js
var express = require('express');
var mongoose = require('mongoose');

var Master = require('./../models/master');
var searchService = require('./../services/searchService');

var router = express.Router();

//get all user list
router.get('/search', function (req, res) {
  console.log('Get All results');
  var promise = searchService.getAlldata([]);

  promise.then(function (data) {
    res.json({ error: false, message:'data Found', data:data });
  }, function (error) {

    res.json({ error: true, message: error });
  });
});

router.get('/searchbydist', function (req, res) {
  console.log('Get results by distance');
  var promise = searchService.getDataByDistance([]);

  promise.then(function (data) {
    res.json({ error: false, message:'data Found', data:data });
  }, function (error) {

    res.json({ error: true, message: error });
  });
});

//create new address
router.post('/search', function (req, res) {
  console.log('Create new Record');
  var promise = searchService.createRecord(req);
  promise.then(function (data) {
    res.json({ error: false, message:'Record created Successfully' });
  }, function (error) {

    res.json({ error: true, message: error });
  });
});

//view data
router.get('/search/:recordid', function (req, res) {
  var promise = searchService.retrieveRecord(req);
  promise.then(function (data) {
    if (data !== null) {
      res.json({ error: false, message:'data Found', data: data });
    }else {
      res.json({ error: false, message:'data Not Found', data: data });
    }

  }, function (error) {

    res.json({ error: true, message: error });
  });
});

router.delete('/search', function (req, res) {
  console.log('deleteall');
  var promise = searchService.deleteAll(req);
  promise.then(function (data) {
    res.json({ error: false, message:'Records deleted Successfully' });
  }, function (error) {

    res.json({ error: true, message: error });
  });
});


module.exports = router;
