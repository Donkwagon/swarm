const express = require('express');
const site = express.Router();
var site_COLLECTION = "sites";
var ObjectID = require('mongodb').ObjectID;

var Site = require("./models/system/site.model")

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

site.get("", function(req, res) {
  db.collection(site_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get sites.");
    } else {
      res.status(200).json(docs);
    }
  });
});

site.get("/site/:siteName", function(req, res) {
  db.collection(site_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get sites.");
    } else {
      res.status(200).json(docs);
    }
  });
});

site.post("", function(req, res) {
  var data = req.body;

  var site = new Site({
      name: data.name,
      url: data.url,
      description: data.description,
      imgUrl: data.imgUrl,
      crawlers: null,
      created_at: new Date(),
      updated_at: new Date()
  });

  console.log(req.body);

  db.collection(site_COLLECTION).insertOne(site, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new site.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

site.get("/:id", function(req, res) {
  db.collection(site_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get site");
    } else {
      res.status(200).json(doc);
    }
  });
});

site.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(site_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update site");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

site.delete("/:id", function(req, res) {
  db.collection(site_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete site");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = site;