const express = require('express');
const securityMaintenance = express.Router();
var SECURITY_COLLECTION = "securities";
var ObjectID = require('mongodb').ObjectID;


var request = require('request');
var cheerio = require('cheerio');

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

securityMaintenance.get("/IEX-listing", function(req, res) {
    //fetch IEX list and map to listed seurities 
    //https://www.iextrading.com/api/mobile/refdata

    var URL = "https://www.iextrading.com/trading/eligible-symbols/";

    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
        }
    }, function(error, response, html){
        console.log(response);
    });
});


module.exports = securityMaintenance;