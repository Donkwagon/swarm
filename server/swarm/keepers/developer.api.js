const express = require('express');
const developer = express.Router();
var DEVELOPER_COLLECTION = "developers";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

developer.get("", function(req, res) {
  db.collection(DEVELOPER_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get developers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

developer.post("", function(req, res) {
  var newdeveloper = req.body;
  newdeveloper.created_at = new Date();

  db.collection(DEVELOPER_COLLECTION).insertOne(newdeveloper, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new developer.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

developer.get("/:uid", function(req, res) {
  db.collection(DEVELOPER_COLLECTION).findOne({ uid: req.params.uid }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get developer");
    } else {
      res.status(200).json(doc);
    }
  });
});

developer.put("/:uid", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(DEVELOPER_COLLECTION).updateOne({uid: req.params.uid}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update developer");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

developer.delete("/:uid", function(req, res) {
  db.collection(DEVELOPER_COLLECTION).deleteOne({uid: req.params.uid}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete developer");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = developer;