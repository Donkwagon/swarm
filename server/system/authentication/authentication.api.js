const express = require('express');
const auth = express.Router();
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

auth.post("", function(req, res) {
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

auth.get("/:id", function(req, res) {
  db.collection(author_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get author");
    } else {
      res.status(200).json(doc);
    }
  });
});


module.exports = auth;