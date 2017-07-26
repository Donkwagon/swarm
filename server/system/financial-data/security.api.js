const express = require('express');
const security = express.Router();
var SECURITY_COLLECTION = "securities";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

security.get("", function(req, res) {
  db.collection(SECURITY_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get securities.");
    } else {
      res.status(200).json(docs);
    }
  });
});

security.get("/site/:siteName", function(req, res) {
  db.collection(SECURITY_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get securities.");
    } else {
      res.status(200).json(docs);
    }
  });
});

security.post("", function(req, res) {
  var newsecurity = req.body;
  newsecurity.createDate = new Date();
  console.log(req.body);

  db.collection(SECURITY_COLLECTION).insertOne(newsecurity, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new security.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

security.get("/:id", function(req, res) {
  db.collection(SECURITY_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get security");
    } else {
      res.status(200).json(doc);
    }
  });
});

security.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(SECURITY_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update security");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

security.delete("/:id", function(req, res) {
  db.collection(SECURITY_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete security");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = security;