const express = require('express');
const article = express.Router();
var article_COLLECTION = "articles";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

article.get("", function(req, res) {
  db.collection(article_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get articles.");
    } else {
      res.status(200).json(docs);
    }
  });
});

article.get("/site/:siteName", function(req, res) {
  db.collection(article_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get articles.");
    } else {
      res.status(200).json(docs);
    }
  });
});

article.post("", function(req, res) {
  var newarticle = req.body;
  newarticle.createDate = new Date();

  db.collection(article_COLLECTION).insertOne(newarticle, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new article.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

article.get("/:id", function(req, res) {
  db.collection(article_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get article");
    } else {
      res.status(200).json(doc);
    }
  });
});

article.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(article_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update article");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

article.delete("/:id", function(req, res) {
  db.collection(article_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete article");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = article;