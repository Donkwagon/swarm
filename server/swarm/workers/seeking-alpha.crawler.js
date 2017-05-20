const express = require('express');
const SA_ROOT = express.Router();

var request = require('request');
var cheerio = require('cheerio');

var SITES_COLLECTION = "sites";
var ENTRANCE_COLLECTION = "entrances";

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//The get method takes sitemap entrance information and organize it into two data structure
//1. Site
//   Nested object that uses the nesting logic from the site's sitemap
//2. Entrance
//   Flat array of entrances. Entance is an object that contains entrance url, site name, site info etc..
//   Flat array of entrances is more ideal for implementing clawling and status reporting.
///////////////////////////////////////////////////////////////////////////////////////////////////////////

SA_ROOT.get('/', function(req, res){

    var site = {};
    site.sitemap = [];
    site.name = "Seeking Alpha";
    site.url = 'http://seekingalpha.com/sitemap';

    var entranceList = [];//flat array of entrance

    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: site.url,headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
        }
    }, function(error, response, html){

        var $ = cheerio.load(html);
        $('.content').each(function(i, el) {

            if($('h3',this).text()){
                var nodeName = $('h3',this).text();
                var node = {};
                node.name = nodeName;
                node.children = [];
                node.type = "";
                node.url = "";

                $('ul',this).each(function(j, e) {
                    var N = {};
                    N.children = [];

                    $('li',this).each(function(k, element) {
                        if($(this).hasClass('title')){
                            N.type = 'title';
                            N.name = $(this).text();
                            N.url = $(this).children('a').attr('href');
                            N.fullUrl = "http://seekingalpha.com" + $(this).children('a').attr('href');
                        }else{
                            n = {};
                            n.type = '';
                            n.name = $(this).text();
                            n.children = [];
                            n.url = $(this).children('a').attr('href');
                            n.fullUrl = "http://seekingalpha.com" + $(this).children('a').attr('href');
                            N.children.push(n);

                            entrance = {};
                            entrance.siteName = site.name;
                            entrance.siteUrl = site.url;
                            entrance.name = n.name;
                            entrance.url = n.fullUrl;
                            entrance.strategy = {};
                            entrance.strategy.name = "";
                            entrance.strategy.url = entrance.fullUrl;
                            entrance.strategy.frequency = "";

                            entranceList.push(entrance);
                        }
                    });
                    node.children.push(N);
                });
                site.sitemap.push(node);
            }
        });
        
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        
        site.createDate = new Date();

        db.collection(SITES_COLLECTION).insertOne(site, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new task.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });

        entranceList.forEach(entrance =>{
            db.collection(ENTRANCE_COLLECTION).insertOne(entrance, function(err, doc) {
                if (err) {handleError(res, err.message, "Failed to create new task.");} 
            });
        });
    });
})

module.exports = SA_ROOT;