const express =           require('express');
var ObjectID =            require('mongodb').ObjectID;
var request =             require('request');
var cheerio =             require('cheerio');

var Article =             require('./models/content/article.model');
var Security =            require('./models/content/security.model');

var io = require('../../socket.server');

console.log();

// var Socket = io.on('connection', function(socket){
//   console.log('123123123');
//   socket.on('message', function(msg){
//     io.emit('message', "123123");
//     io.emit('message','in side callback')
//   });
//   //return socket;
// });

const crawler = express.Router();
var crawler_COLLECTION = "crawlers";


const vm = require('vm');
var _eval = require('eval')

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

crawler.post("/run", function(req, res) {

  var code = req.body.code;
  var URLStrategy = req.body.URLStrategy;
  var URL = req.body.url;

  var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';

  req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});

  req.get({url: URL,headers: {'User-Agent': UserAgent}}, function(error, response, html){

    var $ = cheerio.load(html);

    vm.runInThisContext(code);
    
    if(html){
      res.status(200).json(html);
    }else{
      res.status(200).json("html is not defined");
    }
  });
});

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
  console.log(req.params.siteName);
  db.collection(crawler_COLLECTION).find({site: req.params.siteName}).toArray(function(err, docs) {
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

  db.collection(crawler_COLLECTION).insertOne(newcrawler, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new crawler.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
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