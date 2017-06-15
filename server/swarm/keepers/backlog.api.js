const express = require('express');
const backlog = express.Router();
var backlog_COLLECTION = "backlogs";
var ARTICLE_COLLECTION = "articles";
var ObjectID = require('mongodb').ObjectID;

var Backlog = require("./models/system/backlog.model")
var ArticleBacklog = require("./models/system/backlog_article.model")

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
    shardedGenerator(0,100);
});

function shardedGenerator(i,intv){
  var max = i + intv;
  console.log("max: " + max);
  while(i < max){
    if(i > 1999999){break;}
    var ab = new ArticleBacklog({
      i: i,
      st:null,
      res:0,
      t:"SAArticle"
    })
    ab.save();
    i++;
  }
  setTimeout(function(){ shardedGenerator(i,intv) }, 20);
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