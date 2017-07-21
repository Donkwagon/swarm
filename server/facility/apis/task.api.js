const express = require('express');
const task = express.Router();
var TASK_COLLECTION = "tasks";
var ObjectID = require('mongodb').ObjectID;

var Task = require('../models/task.model');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

task.get("", function(req, res) {
  db.collection(TASK_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get tasks.");
    } else {
      res.status(200).json(docs);
    }
  });
});

task.get("/site/:siteName", function(req, res) {
  db.collection(TASK_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get tasks.");
    } else {
      res.status(200).json(docs);
    }
  });
});

task.post("", function(req, res) {
  var newtask = req.body;
  newtask.createDate = new Date();
  console.log(req.body);

  db.collection(TASK_COLLECTION).insertOne(newtask, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new task.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

task.get("/:id", function(req, res) {
  db.collection(TASK_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get task");
    } else {
      res.status(200).json(doc);
    }
  });
});

task.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(TASK_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update task");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

task.delete("/:id", function(req, res) {
  db.collection(TASK_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete task");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = task;