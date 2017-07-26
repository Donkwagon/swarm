const express = require('express');
const exchange = express.Router();
var EXCHANGE_COLLECTION = "exchanges";
var SECURITIY_COLLECTION = "securities";
var ObjectID = require('mongodb').ObjectID;

const Exchange = require("./models/exchange.model");

var request = require('request');
var cheerio = require('cheerio');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

exchange.get("", function(req, res) {
  db.collection(EXCHANGE_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get exchanges.");
    } else {
      res.status(200).json(docs);
    }
  });
});

exchange.get("/fetch-lastest-exchanges", function(req, res) {

    var URL = "http://www.eoddata.com/download.aspx";

    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
        }
    }, function(error, response, html){

        var $ = cheerio.load(html);
        console.log(html);

        $("#ctl00_cph1_hd1_cboExchange").children().each(function(i, elem) {
          var exchangeSymbol = $(this).attr("value");
          var exchangeName = $(this).text();

          var exchange = new Exchange({
            exchange: exchangeSymbol,
            exchangeName: exchangeName,
            numSecurities: 0,
            created_at: new Date(),
            updated_at: new Date()
          })

          console.log(exchange);
          db.collection(EXCHANGE_COLLECTION).insertOne(exchange, function(err, doc) {
            if (err) {
              handleError(res, err.message, "Failed to create new exchange.");
            } else {
              console.log(doc);
            }
          });

        });

    });
});

exchange.get("/num-securities/:exchange", function(req, res) {
  db.collection(SECURITIY_COLLECTION).find({exchange:req.params.exchange}).count(function(err, count){
    console.log(count)

    db.collection(EXCHANGE_COLLECTION).updateOne({exchange: req.params.exchange}, {$set:{numSecurities: count}}, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update exchange");
      } else {
        res.status(200).json(doc);
      }
    });
  });
});

exchange.get("/site/:siteName", function(req, res) {
  db.collection(EXCHANGE_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get exchanges.");
    } else {
      res.status(200).json(docs);
    }
  });
});

exchange.post("", function(req, res) {
  var newexchange = req.body;
  newexchange.createDate = new Date();
  console.log(req.body);

  db.collection(EXCHANGE_COLLECTION).insertOne(newexchange, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new exchange.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

exchange.get("/:id", function(req, res) {
  db.collection(EXCHANGE_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get exchange");
    } else {
      res.status(200).json(doc);
    }
  });
});

exchange.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(EXCHANGE_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update exchange");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

exchange.delete("/:id", function(req, res) {
  db.collection(EXCHANGE_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete exchange");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = exchange;