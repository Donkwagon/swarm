const express = require('express');
const backlog = express.Router();
var backlog_COLLECTION = "backlogs";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.backlog("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

backlog.get("", function(req, res) {
  db.collection(backlog_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get backlogs.");
    } else {
      res.status(200).json(docs);
    }
  });
});

backlog.get("/site/:siteName", function(req, res) {
  db.collection(backlog_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get backlogs.");
    } else {
      res.status(200).json(docs);
    }
  });
});

backlog.post("", function(req, res) {
  var newbacklog = req.body;
  newbacklog.createDate = new Date();
  console.backlog(req.body);

  db.collection(backlog_COLLECTION).insertOne(newbacklog, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new backlog.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

backlog.get("/:id", function(req, res) {
  db.collection(backlog_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get backlog");
    } else {
      res.status(200).json(doc);
    }
  });
});

backlog.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(backlog_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update backlog");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

backlog.delete("/:id", function(req, res) {
  db.collection(backlog_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete backlog");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = backlog;