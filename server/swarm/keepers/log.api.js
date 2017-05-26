const express =    require('express');
var ObjectID =     require('mongodb').ObjectID;

var log_COLLECTION = "logs";
const log = express.Router();

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

log.get("", function(req, res) {
  db.collection(log_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get logs.");
    } else {
      res.status(200).json(docs);
    }
  });
});



module.exports = log;