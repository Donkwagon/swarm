const express =           require('express');
var ObjectID =            require('mongodb').ObjectID;
var request =             require('request');
var cheerio =             require('cheerio');
var mongoose =        require('mongoose');

const vm =                require('vm');

var ws = global.io.sockets;

const MongoDb = express.Router();

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  emitMsg("message","error",reason);
  res.status(code || 500).json({"error": message});
}

MongoDb.post("/run", function(req, res) {

  var MongoDb = req.body;
  var URLStrategy = req.body.URLStrategy;
  
  emitMsg("message","normal","testing MongoDb");
  strategyTester(MongoDb);

});


emitMsg = (channel,status,content) => {

  var msg = {
    status: status,
    content: content
  }

  ws.emit(channel,msg);
}

//////////////////////////////////////////////////////
//generic apis
//////////////////////////////////////////////////////

MongoDb.get("", function(req, res) {
  console.log(db.system);
  var data = JSON.stringify(db.system);
  console.log(data);
  res.status(200).json(data);
});

MongoDb.get("/site/:siteName", function(req, res) {
  db.collection(MongoDb_COLLECTION).find({site: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get MongoDbs.");
    } else {
      res.status(200).json(docs);
    }
  });
});

MongoDb.post("", function(req, res) {
  var newMongoDb = req.body;
  newMongoDb.createDate = new Date();

  db.collection(MongoDb_COLLECTION).insertOne(newMongoDb, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new MongoDb.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

MongoDb.get("/:id", function(req, res) {
  db.collection(MongoDb_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get MongoDb");
    } else {
      res.status(200).json(doc);
    }
  });
});

MongoDb.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MongoDb_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update MongoDb");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

MongoDb.delete("/:id", function(req, res) {
  db.collection(MongoDb_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete MongoDb");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = MongoDb;