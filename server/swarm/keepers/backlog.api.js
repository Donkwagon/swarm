const express = require('express');
const backlog = express.Router();
var backlog_COLLECTION = "backlogs";
var ARTICLE_COLLECTION = "articles";
var ObjectID = require('mongodb').ObjectID;

var Backlog = require("./models/backlog.model")
var ArticleBacklog = require("./models/backlog_article.model")

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.backlog("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

backlog.get("", function(req, res) {
  db.collection(backlog_COLLECTION).find({}).limit(200).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get backlogs.");
    } else {
      res.status(200).json(docs);
    }
  });
});

backlog.get("/archive", function(req, res) {
  Backlog.find({status:"fetched"},function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get backlogs.");
    } else {
      docs.forEach(el =>{
          console.log(el);
          el.archive();
      });
    }
  });
});

backlog.get('/typecleaning', function(req, res){

    Backlog.find({"type":"article"}, function(err, docs) {
        if (err) throw err;
        docs.forEach( doc =>{
            console.log(typeof(doc.articleId));
            doc.save();
        });
    });
});

backlog.get('/generate', function(req, res){
    shardedGenerator(3600706,100);
});

function shardedGenerator(i,intv){
  var max = i + intv;
  console.log("max: " + max);
  while(i < max){
    if(i > 4079627){break;}
    var ab = new ArticleBacklog({
      i: i,
      st:null,
      res:0
    })
    ab.save();
    i++;
  }
  setTimeout(function(){ shardedGenerator(i,intv) }, 15);
}


backlog.get("/type/:type", function(req, res) {
  console.log(req.params);
  db.collection(backlog_COLLECTION).find({"type": req.params.type}).limit(200).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get backlogs.");
    } else {
      res.status(200).json(docs);
    }
  });
});

backlog.post("", function(req, res) {
  var newbacklog = req.body;
  newbacklog.createDate = new Date();
  console.backlog(req.body);

  db.collection(backlog_COLLECTION).insertOne(newbacklog, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new backlog.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

backlog.get("/:id", function(req, res) {
  db.collection(backlog_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get backlog");
    } else {
      res.status(200).json(doc);
    }
  });
});

backlog.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(backlog_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update backlog");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

backlog.delete("/:id", function(req, res) {
  db.collection(backlog_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete backlog");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = backlog;