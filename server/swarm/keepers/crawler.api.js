const express =           require('express');
var ObjectID =            require('mongodb').ObjectID;
var mongoose =            require('mongoose');
var request =             require('request');
var cheerio =             require('cheerio');

var Article =             require('./models/content/article.model');
var Security =            require('./models/content/security.model');
var CrawlerBacklog =      require('./models/system/crawler_backlog.model');
var Seed =      require('./classes/seed.class');
const CRAWLERBACKLOG_COLLECTION = "crawlerbacklogs";


const vm =                require('vm');

var ws = global.io.sockets;

const crawler = express.Router();
var crawler_COLLECTION = "crawlers";

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  emitMsg("message","error",reason);
  res.status(code || 500).json({"error": message});
}

crawler.post("/generateBacklog", function(req, res) {

  var crawler = req.body;

  var idRangeUrlCount = 0;
  var batchIdStart = 0;
  var batchIdEnd = 0;

  crawler.urlStrategy.sections.forEach(el => {
    if(el.type="ID RANGE"){
      idRangeUrlCount = el.max - el.min;
      batchIdStart = Math.floor(el.min/crawler.backlogBatchSize);
      batchIdEnd = Math.round(el.max/crawler.backlogBatchSize);
    }
  });
  
  emitMsg("message","normal","Generating backlogs");
  createBatch(crawler,idRangeUrlCount,batchIdStart,batchIdEnd);
});

createBatch = (crawler,idRangeUrlCount,batchId,batchIdEnd) => {

  var batch = [];
  var backlogBatchSize = crawler.backlogBatchSize;

  var i = 0;
  
  while(i < backlogBatchSize){
    var seed = new Seed(i);
    console.log(seed);
    batch.push(seed);
    i++;
  }
  console.log(JSON.stringify(batch));

  // var crawlerBacklog = new CrawlerBacklog({

  //   site: crawler.site,
  //   crawlerName: crawler.name,

  //   batchId: batchId,
  //   batch: batch,
  //   totalNum: backlogBatchSize,
  //   completedNum: 0,
  //   completed: false,
  //   response: [],
  //   created_at: new Date(),
  //   updated_at: new Date()
  // });

  // db.collection(CRAWLERBACKLOG_COLLECTION).insertOne(crawlerBacklog, function(err, doc) {
  //   if (err) {
  //     handleError(res, err.message, "Failed to get crawler");
  //   } else {
  //     emitMsg("message","success","Batch " + batchId +" created");
  //     batchId++;
  //     if(batchId <= batchIdEnd){
  //       createBatch(crawler,idRangeUrlCount,batchId,batchIdEnd);
  //     }
  //   }
  // });

  // crawlerBacklog.save();

  console.log("crawler backlog post work");

}


crawler.post("/run", function(req, res) {

  var crawler = req.body;
  var URLStrategy = req.body.URLStrategy;
  
  emitMsg("message","normal","testing crawler");
  strategyTester(crawler);

});

strategyTester = (crawler) => {

  var urlStrategy = crawler.urlStrategy;
  var range_min = null;
  var range_max = null;

  if(crawler.testingStrategy){
    emitMsg("message","normal","testing strategy ok");
    var testingStrategy = crawler.testingStrategy;
  }else{
    emitMsg("message","error","Testing strategy undefined");
    return false;
  }

  var root = urlStrategy.root;

  
  emitMsg("message","normal","root URL obtained " + root);

  urlStrategy.sections.forEach(section => {
    if(section.type === 'ID RANGE'){
      range_min = section.min;
      range_max = section.max;
    }
  });
  
  if(testingStrategy.type === 'single'){

    var URL = new Array();
    var url = root;

    urlStrategy.sections.forEach(section => {

      if(section.type === "CONSTANT"){
          url += section.url + "/";
      }
      if(section.type === "ID RANGE"){
        url += section.prefix + testingStrategy.id + section.suffix + "/";
      }
      if(section.type === "TICkER"){
          url += section.prefix + "AAPL" + section.suffix + "/"
      }

    });
    
    url = url.substring(0, url.length - 1);

    URL.push(url);
    
    emitMsg("message","normal","executing single request");
    crawlerTestingExecute(URL,0,2000,crawler);
  }

  if(testingStrategy.type === 'multiple'){
    
    var num = testingStrategy.num;
    var URL = new Array();

    var i = 0;

    while(i < num){
      var url = root;

      urlStrategy.sections.forEach(section => {

        if(section.type === "CONSTANT"){
          url += section.url + "/";
        }
        if(section.type === "ID RANGE"){
          var id = Math.random() * (range_max - range_min) + range_min;
          id = parseInt(id);
          url += section.prefix + id + section.suffix + "/";
        }
        if(section.type === "TICkER"){
          url += section.prefix + "AAPL" + section.suffix + "/"
        }
        
      });
      url = url.substring(0, url.length - 1);

      emitMsg("message","normal","URL generated " + url);
      
      URL.push(url);

      i++;

    }

    emitMsg("message","normal","executing multiple requests");
    crawlerTestingExecute(URL,0,2000,crawler);
  }

}

crawlerTestingExecute = (URL, index, intv, crawler) => {
  //URL: array of urls
  //index: index for looping this function
  //interval: interval for stress testing

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
  emitMsg("message","normal","crawling " + url);

  var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';

  req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});

  req.get({url: url,headers: {'User-Agent': UserAgent}}, function(error, response, html){

    global.$ = cheerio.load(html);
    vm.runInThisContext(code);

    //check if all fields are filled
    title ?          emitMsg("message","success","title ok")          : emitMsg("message","error","title bad");
    author ?         emitMsg("message","success","author ok")         : emitMsg("message","error","author bad");
    primaryStock ?   emitMsg("message","success","primaryStock ok")   : emitMsg("message","error","primaryStock bad");
    username ?       emitMsg("message","success","username ok")       : emitMsg("message","error","username bad");
    articleId ?      emitMsg("message","success","articleId ok")      : emitMsg("message","error","articleId bad");
    include_stocks ? emitMsg("message","success","include_stocks ok") : emitMsg("message","error","include_stocks bad");
    summary ?        emitMsg("message","success","summary ok")        : emitMsg("message","error","summary bad");
    publish_at ?     emitMsg("message","success","publish_at ok")     : emitMsg("message","error","publish_at bad");
    
    if(title && author && username && articleId && publish_at){
      emitMsg("data","success",articleId);
    }else{
      emitMsg("data","error",parseInt(articleId));
    }
  });
}

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