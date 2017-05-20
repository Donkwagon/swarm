const express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var request = require('request');
var cheerio = require('cheerio');

var Backlog = require('./backlog.model');

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
    req.get({url: URL,headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'}
    }, function(error, response, html){
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var $ = cheerio.load(html);
        if(!error){
            if($('li').filter('.article')){
                $('li').filter('.article').each(function(i, el) {
                    if($('a','.a-info',this).eq(1).text() && $(this).attr('article_id')){
                        var articleBacklog = new Backlog({
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
                        
                        Backlog.find({"backlogID" : articleBacklog.backlogID}, function (err, docs) {
                            console.log(docs);
                            if (!docs.length){articleBacklog.save(function(err){
                                    if (err) throw err;
                                    console.log('articleBacklog saved successfully!');
                                });
                            }else{
                                console.log("backlog already exist!")
                            }
                        });

                        var authorBacklog = new Backlog({
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
                        
                        Backlog.find({"backlogID" : authorBacklog.backlogID}, function (err, docs) {
                            console.log(docs);
                            if (!docs.length){authorBacklog.save(function(err) {
                                    if (err) throw err;
                                    console.log('authorBacklog saved successfully!');
                                });
                            }else{
                                console.log("backlog already exist!")
                            }
                        });

                    }
                });
                
            }
        }
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        if(!error&&response.statusCode == 200){
            setTimeout(function(){
                fetcBacklogFromArticleList(baseURL,pageNum);
            }, 3000);
        }
    });
}



var Entrance = mongoose.model('Entrance', entranceSchema);

module.exports = Entrance;