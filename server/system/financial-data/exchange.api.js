const express = require('express');
const exchange = express.Router();
var EXCHANGE_COLLECTION = "exchanges";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

exchange.get("", function(req, res) {
  db.collection(EXCHANGE_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get exchanges.");
    } else {
      res.status(200).json(docs);
    }
  });
});

exchange.get("/site/:siteName", function(req, res) {
  db.collection(EXCHANGE_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get exchanges.");
    } else {
      res.status(200).json(docs);
    }
  });
});

exchange.post("", function(req, res) {
  var newexchange = req.body;
  newexchange.createDate = new Date();
  console.log(req.body);

  db.collection(EXCHANGE_COLLECTION).insertOne(newexchange, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new exchange.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

exchange.get("/:id", function(req, res) {
  db.collection(EXCHANGE_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get exchange");
    } else {
      res.status(200).json(doc);
    }
  });
});

exchange.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(EXCHANGE_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update exchange");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

exchange.delete("/:id", function(req, res) {
  db.collection(EXCHANGE_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete exchange");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = exchange;