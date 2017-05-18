const express = require('express');
const entrance = express.Router();
var ENTRANCE_COLLECTION = "entrance";
var ObjectID = require('mongodb').ObjectID;
// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

entrance.get("", function(req, res) {
  db.collection(ENTRANCE_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get entrances.");
    } else {
      res.status(200).json(docs);
    }
  });
});

entrance.get("/status/:status", function(req, res) {
  db.collection(ENTRANCE_COLLECTION).find({status: req.params.status}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get entrances.");
    } else {
      res.status(200).json(docs);
    }
  });
});

entrance.post("", function(req, res) {
  var newentrance = req.body;
  newentrance.createDate = new Date();
  console.log(req.body);

  db.collection(ENTRANCE_COLLECTION).insertOne(newentrance, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new entrance.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

entrance.get("/:id", function(req, res) {
  db.collection(ENTRANCE_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get entrance");
    } else {
      res.status(200).json(doc);
    }
  });
});

entrance.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(ENTRANCE_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update entrance");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

entrance.delete("/:id", function(req, res) {
  db.collection(ENTRANCE_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete entrance");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = entrance;