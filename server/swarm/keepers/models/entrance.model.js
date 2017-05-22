const express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var request = require('request');
var cheerio = require('cheerio');

var Backlog = require('./backlog.model');
///////////////////////////////////////////////////////
var serviceAccount =  require("../../../firebase/swarm-2124b-firebase-adminsdk-towvk-3a3e35ee20.json");
var admin = require("firebase-admin");
admin.initializeApp({credential: admin.credential.cert(serviceAccount),databaseURL: "https://swarm-2124b.firebaseio.com"});
var firebaseDb = admin.database();
var ref = firebaseDb.ref("swarm");

var entranceSchema = new Schema({

  name: String,
  url: String,
  siteName: String,
  siteUrl: String,
  strategy: Schema.Types.Mixed,
  status: String,

  created_at: Date,
  updated_at: Date
});

entranceSchema.methods.fetchBacklogData = function() {
    if (this.url){
        var pageNum = 0;
        fetcBacklogFromArticleList(this.url,pageNum);
    }
};

fetcBacklogFromArticleList = function (baseURL,pageNum) {

    pageNum++;
    URL = baseURL + "?page=" + pageNum;
    console.log(URL);
    
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'}
    }, function(error, response, html){
        if(!error){console.log('error:', error);} // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var $ = cheerio.load(html);
        if(!error){
            if($('li').filter('.article')){
                $('li').filter('.article').each(function(i, el) {
                    if($('a','.a-info',this).eq(1).text() && $(this).attr('article_id')){
                        var articleBL = new Backlog({
                            type: "article",
                            created_at: new Date(),
                            url: $('.a-title',this).attr('href'),
                            backlogID: $(this).attr('article_id'),
                            content: {
                                title: $('.a-title',this).text(),
                                displayName: $('a','.a-info',this).eq(1).text(),
                                username: $('a','.a-info',this).eq(1).attr('href').split('/')[2],
                            }
                        });
                        
                        Backlog.find({"backlogID" : articleBL.backlogID}, function (err, docs) {
                            if (!docs.length){articleBL.save(function(err){if (err) throw err;console.log('Saved!');});
                            }else{console.log("backlog already exist!")}
                        });

                        var authorBL = new Backlog({
                            type: "author",
                            createDate: new Date(),
                            backlogID: $('a','.a-info',this).eq(1).attr('href').split('/')[2],
                            url: $('a','.media-left',this).attr('href'),
                            content: {
                                username: $('a','.a-info',this).eq(1).attr('href').split('/')[2],
                                displayName: $('a','.a-info',this).eq(1).text(),
                                displayImage: $('img','.media-left',this).attr('src')
                            }
                        });
                        
                        Backlog.find({"backlogID" : authorBL.backlogID}, function (err, docs) {
                            if (!docs.length){authorBL.save(function(err) {if (err) throw err;console.log('Saved!');});
                            }else{console.log("backlog already exist!")}
                        });

                        var logsRef = ref.child("logs");
                        logsRef.push({
                            alanisawesome: {
                                date_of_birth: "June 23, 1912",
                                full_name: "Alan Turing"
                            }
                        });

                    }
                });
                
            }
        }
        if(!error&&response.statusCode == 200){
            setTimeout(function(){
                fetcBacklogFromArticleList(baseURL,pageNum);
            }, 3000);
        }
    });
}


var Entrance = mongoose.model('Entrance', entranceSchema);

module.exports = Entrance;