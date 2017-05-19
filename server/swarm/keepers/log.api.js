const express = require('express');
const log = express.Router();
var log_COLLECTION = "log";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

log.get("", function(req, res) {
  db.collection(log_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get logs.");
    } else {
      res.status(200).json(docs);
    }
  });
});

log.get("/site/:siteName", function(req, res) {
  db.collection(log_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get logs.");
    } else {
      res.status(200).json(docs);
    }
  });
});

log.post("", function(req, res) {
  var newlog = req.body;
  newlog.createDate = new Date();
  console.log(req.body);

  db.collection(log_COLLECTION).insertOne(newlog, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new log.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

log.get("/:id", function(req, res) {
  db.collection(log_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get log");
    } else {
      res.status(200).json(doc);
    }
  });
});

log.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(log_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update log");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

log.delete("/:id", function(req, res) {
  db.collection(log_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete log");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = log;