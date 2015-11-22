'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var yelp = require("yelp").createClient({
  consumer_key: "v7_TAw6KHkoesARYVYOaMg",
  consumer_secret: "896Ra6s03FsrlJRduyu8luSYe74",
  token: "UJTQZ4OV8T0Ip17pdWiZry4-_xBirvPU",
  token_secret: "bcayaOV65VnOsA1_QX8M0Xtn2mU"
});
var async = require('async');

// Get list of items
exports.index = function(req, res) {
  Item.find({}, function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// Get a single item
exports.show = function(req, res) {
  var itemId = req.params.id,
      dataFromDB,
      dataFromYelp,
      allData;

  var getItemFromDatabase = function(done) {
    Item.findById(itemId, function(err, dataFromDatabase) {
      if(err) { return handleError(res, err); }
      if(!dataFromDatabase) {
        return res.send(404);
      }
      dataFromDB = dataFromDatabase;
      done(null, "done getting an item from database");
    });
  };

  var getItemFromYelp = function(done) {
    var yelpName = dataFromDB.yelpName;
    yelp.business(yelpName, function(err, dataFromYelp) {
      if (err) {
        allData = {
          dataFromDatabase: dataFromDB,
          dataFromYelp: false
        };
      } else {
        allData = {
          dataFromDatabase: dataFromDB,
          dataFromYelp: dataFromYelp
        };
      }

      done(null, "done getting an item from yelp");
    });
  };

  var gotEverything = function(err, results) {
    return res.json(200, allData);
  };

  async.series([getItemFromDatabase, getItemFromYelp], gotEverything);
};

// Creates a new item in the DB.
exports.create = function(req, res) {
  Item.create(req.body, function(err, item) {
    if(err) { return handleError(res, err); }
    return res.json(201, item);
  });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    var updated = _.merge(item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, item);
    });
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
