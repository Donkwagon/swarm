const express =           require('express');
var ObjectID =            require('mongodb').ObjectID;
var request =             require('request');
var cheerio =             require('cheerio');

var Article =             require('./models/content/article.model');
var Security =            require('./models/content/security.model');
var app = express();

var ws = global.io.sockets;

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

  var crawler = req.body;
  var URLStrategy = req.body.URLStrategy;

  strategyTester(crawler);
});

function strategyTester (crawler) {

  var urlStrategy = crawler.urlStrategy;
  var range_min = null;
  var range_max = null;

  if(crawler.testingStrategy){
    var testingStrategy = crawler.testingStrategy;
  }else{
    var message = {
      type: "error",
      content: "Testing strategy undefined"
    };
    ws.emit('message',message);
    return false;
  }

  var root = urlStrategy.root;

  urlStrategy.sections.forEach(section => {
    if(section.type === 'RANGE ID'){
      range_min = section.min;
      range_max = section.max;
    }
  });
  
  if(testingStrategy.type === 'single'){
    var URL = new Array();
    console.log(typeof(URL));
    var url = root;

    urlStrategy.sections.forEach(section => {

      if(section.type === "CONSTANT"){
        url += section.url;
        url += "/";
      }
      if(section.type === "ID RANGE"){
        url += testingStrategy.id;
        url += "/";
      }
      if(section.type === "TICkER"){
        url += "AAPL"
        url += "/";
      }

    });

    console.log(URL);
    URL.push(url);
    console.log(URL);
    crawlerTestingExecute(URL,0,2000,crawler);
  }

  if(testingStrategy.type == 'mulitple'){
    var num = testingStrategy.num;
    var URL = new Array();

    var i = 0;
    while(i < num){
      var url = root;

      urlStrategy.sections.forEach(section => {

        if(section.type === "CONSTANT"){
          url += section.url;
          url += "/";
        }
        if(section.type === "ID RANGE"){
          var id = MATH.floor(Math.random() * (range_max - range_min) + range_min);
          url += id;
          url += "/";
        }
        if(section.type === "TICkER"){
          url += "AAPL"
          url += "/";
        }

        URL.push(url);
      });

      i++;

    }

    crawlerTestingExecute(URL,0,2000,crawler);
  }

}

crawlerTestingExecute = (URL, index, intv, crawler) => {
  //URL: array of urls
  //index: index for looping this function
  //interval: interval for stress testing

  console.log(typeof(URL));
  var len = URL.length;

  if(index < len){
    var url = URL[index];
    crawlPage(url,crawler );

    setTimeout(function(){
      index++;
      crawlerTestingExecute(URL, index, intv, crawler);
    }, intv);

  }

}

crawlPage = (url, crawler) => {
  //crawling code goes here
  var code = crawler.code;
  console.log(code);

  var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';

  req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});

  req.get({url: url,headers: {'User-Agent': UserAgent}}, function(error, response, html){

    global.$ = cheerio.load(html);
    
    vm.runInThisContext(code);

    if(title){ws.emit('message',"title ok")}else{ws.emit('message',"title bad")};
    if(author){ws.emit('message',"author ok")}else{ws.emit('message',"title bad")};
    if(primaryStock){ws.emit('message',"primaryStock ok")}else{ws.emit('message',"primaryStock bad")};
    if(username){ws.emit('message',"username ok")}else{ws.emit('message',"username bad")};
    if(articleId){ws.emit('message',"articleId ok")}else{ws.emit('message',"articleId bad")};
    if(include_stocks){ws.emit('message',"include_stocks ok")}else{ws.emit('message',"include_stocks bad")};
    if(summary){ws.emit('message',"summary ok")}else{ws.emit('message',"summary bad")};
    if(publish_at){ws.emit('message',"publish_at ok")}else{ws.emit('message',"publish_at bad")};

  });

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