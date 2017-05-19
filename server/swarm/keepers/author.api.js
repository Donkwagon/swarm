const express = require('express');
const author = express.Router();
var author_COLLECTION = "author";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

author.get("", function(req, res) {
  db.collection(author_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get authors.");
    } else {
      res.status(200).json(docs);
    }
  });
});

author.get("/site/:siteName", function(req, res) {
  db.collection(author_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get authors.");
    } else {
      res.status(200).json(docs);
    }
  });
});

author.post("", function(req, res) {
  var newauthor = req.body;
  newauthor.createDate = new Date();
  console.log(req.body);

  db.collection(author_COLLECTION).insertOne(newauthor, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new author.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

author.get("/:id", function(req, res) {
  db.collection(author_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get author");
    } else {
      res.status(200).json(doc);
    }
  });
});

author.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(author_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update author");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

author.delete("/:id", function(req, res) {
  db.collection(author_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete author");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = author;