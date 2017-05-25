const express =   require('express');
var mongoose =    require('mongoose');
var request =     require('request');
var cheerio =     require('cheerio');

var chalk =       require('chalk');

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
        var pageNum = 0;
        var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';
        webpageOpener(this.url,pageNum,UserAgent);
    }
};

webpageOpener = function (baseURL,pageNum,UserAgent) {

    URL = baseURL + "?page=" + pageNum;
    pageNum++;
    console.log(URL);
    
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {'User-Agent': UserAgent}}, function(error, response, html){
        if(error||response.statusCode != 200){
            console.log(chalk.red('error:' + error + "status:" + response.statusCode));

            var log = new Log({
                message: "Request Error" + response.statusCode + URL,
                subject: "Request Response",
                level: 2,status: response.statusCode,action: "Request",
                created_at: new Date()
            });
            
            log.pushToFirebaseDb(log);

        }else{
            console.log(chalk.green("status" + response.statusCode));
            webpageTetacles(html);
            setTimeout(() =>{webpageOpener(baseURL,pageNum,UserAgent);}, 10);

            var log = new Log({
                message: "Request OK" + response.statusCode + URL,
                subject: "Request Response",
                level: 2,status: response.statusCode,action: "Request",
                created_at: new Date()
            });
            
            log.pushToFirebaseDb(log);
        }
    });
}

webpageTetacles = (html) => {

    var $ = cheerio.load(html);
    if($('li').filter('.article')){
        $('li').filter('.article').each(function(i, el) {
            if($('a','.a-info',this).eq(1).text() && $(this).attr('article_id')){

                /////////////////////////////////////////////////////////////////////////////////
                //Data values of interest
                var backlogID_article =    $(this).attr('article_id');
                var backlogID_author =     $('a','.a-info',this).eq(1).attr('href').split('/')[2];
                var title =                $('.a-title',this).text();
                var displayName =          $('a','.a-info',this).eq(1).text();
                var displayImage =         $('img','.media-left',this).attr('src');
                var username =             $('a','.a-info',this).eq(1).attr('href').split('/')[2];
                var URL_article =          $('.a-title',this).attr('href');
                var URL_author =           $('a','.media-left',this).attr('href');

                /////////////////////////////////////////////////////////////////////////////////
                //Create new backlog for article and save if it doesn't exist in backlogs list
                var articleBL = new Backlog({
                    type: "article",created_at: new Date(),
                    url: URL_article,
                    backlogID: backlogID_article,
                    content: {title: title,displayName: displayName,username: username}
                });

                saveBacklog(articleBL);

                var log = new Log({
                    message: "Parse" + articleBL.title,
                    subject: "Article Backlog",
                    level: 1,status: 200,action: "Parse",
                    created_at: new Date()
                });
                
                log.pushToFirebaseDb(log);

                /////////////////////////////////////////////////////////////////////////////////
                //Create new backlog for author and save if it doesn't exist in backlogs list
                var authorBL = new Backlog({
                    type: "author",created_at: new Date(),
                    backlogID: backlogID_author,
                    url: URL_author,
                    content: {username: username,displayName: displayName,displayImage: displayImage}
                });

                saveBacklog(authorBL);
                //log.save(function(err) {if (err) throw err;console.log('Saved!')});

                var log = new Log({
                    message: "Parsed" + authorBL.title,
                    subject: "Author Backlog",
                    level: 1,status: 200,action: "Parse",
                    created_at: new Date()
                });
                
                log.pushToFirebaseDb(log);
            }
        });
    }
}

saveBacklog = (backlog) =>{

    Backlog.find({"backlogID" : backlog.backlogID}, function (err, docs) {
        if (!docs.length){
            backlog.save(function(err){
                if (err) throw err;
                console.log(chalk.green("Saved"));
                var log = new Log({
                    message: backlog.url,
                    level: 1,
                    status: 200,
                    subject: "Article Url",
                    action: "Save",

                    created_at: new Date()
                });
                log.pushToFirebaseDb(log);
            });
        }else{
            console.log(chalk.yellow("backlog already exist!"));
            var log = new Log({
                message: "Backlog exist",
                level: 1,
                status: 302 ,
                subject: "Article Url",
                action: "Save",

                created_at: new Date()
            });

            log.pushToFirebaseDb(log);
        }
    });
}

var Entrance = mongoose.model('Entrance', entranceSchema);

module.exports = Entrance;