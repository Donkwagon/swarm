const express =   require('express');
var mongoose =    require('mongoose');
var request =     require('request');
var cheerio =     require('cheerio');

var Backlog =     require('./backlog.model');
var Log =         require('./log.model');

var Schema = mongoose.Schema;

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
        var pageNum = 0, UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';
        webpageOpener(this.url,pageNum,UserAgent);
    }
};

webpageOpener = function (baseURL,pageNum,UserAgent) {

    URL = baseURL + "?page=" + pageNum;pageNum++;console.log(URL);
    
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {'User-Agent': UserAgent}}, function(error, response, html){
        if(error||response.statusCode != 200){
            console.log('error:'+ error);
            console.log("status:"+response.statusCode);
        }else{
            console.log("status:"+response.statusCode);
            webpageTetacle(html);
            setTimeout(() =>{webpageOpener(baseURL,pageNum,UserAgent);}, 3000);
        }
    });
}

webpageTetacle = (html) => {
    //page parsing logic
    //takes html and return desired data

    var $ = cheerio.load(html);
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
                var log = new Log({
                    message: "article and author saved",
                    level: 1,
                    status: 200,
                    subject: "article",
                    action: "save",

                    created_at: new Date(),
                    updated_at: new Date()
                });
                log.save(function(err) {if (err) throw err;console.log('Saved!')});

            }
        });
    }
}

var Entrance = mongoose.model('Entrance', entranceSchema);

module.exports = Entrance;