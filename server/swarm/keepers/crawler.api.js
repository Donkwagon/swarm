const express = require('express');
const crawler = express.Router();
var crawler_COLLECTION = "crawlers";
var ObjectID = require('mongodb').ObjectID;

const vm = require('vm');
var _eval = require('eval')

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

crawler.get("", function(req, res) {
  db.collection(crawler_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get crawlers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

crawler.get("/site/:siteName", function(req, res) {
  db.collection(crawler_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get crawlers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

crawler.post("", function(req, res) {
  var newcrawler = req.body;
  newcrawler.createDate = new Date();
  console.log(req.body);

  db.collection(crawler_COLLECTION).insertOne(newcrawler, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new crawler.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

crawler.post("/run", function(req, res) {
  var data = req.body.code;
  vm.runInThisContext(data);
  console.log(data);
  console.log(fuck);
});

crawler.get("/:id", function(req, res) {
  db.collection(crawler_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get crawler");
    } else {
      res.status(200).json(doc);
    }
  });
});

crawler.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(crawler_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update crawler");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

crawler.delete("/:id", function(req, res) {
  db.collection(crawler_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete crawler");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = crawler;