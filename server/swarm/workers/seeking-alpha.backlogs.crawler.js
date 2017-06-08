
const express =   require('express');

var Entrance =    require('../keepers/models/system/entrance.model');
var Backlog =     require('../keepers/models/system/backlog.model');
var Author =      require('../keepers/models/content/author.model');
var Log =         require('../keepers/models/system/log.model');

const SA = express.Router();

var SITES_COLLECTION = "sites";
var BACKLOG_COLLECTION = "backlogs";

SA.get('/', function(req, res){

    Entrance.find({"name":"Quick Stock Picks & Lists"}, function(err, entrances) {
        if (err) throw err;
        entrances.forEach( entrance =>{
            entr = new Entrance(entrance);
            entr.fetchBacklogData(function(err, name) {
                if (err) throw err;
                console.log("fetching from one entrance");
            });
        })
    });
});

SA.get('/author', function(req, res){

    Backlog.find({"type":"author"}, function(err, authorBacklogs) {
        if (err) throw err;
        index = 0;
        fetchAuthorInfo(authorBacklogs,index);
    });
});

SA.get('/article', function(req, res){

    Backlog.find({"type":"article"}, function(err, articleBacklogs) {
        if (err) throw err;
        index = 0;
        fetchArticleInfo(articleBacklogs,index);
    });
});

fetchAuthorInfo = (authorBacklogs,index) => {

    index++;
    backlog = authorBacklogs[index];
    backlog = new Backlog(backlog);

    if(backlog.status != "fetched"){
        
        backlog.crawl();
        Backlog.find({"backlogID" : backlog.backlogID}, function (err, docs) {
            docs[0].status = "fetched";
            docs[0].save();
        });

        var log = new Log({
            message: "Fetch" + backlog.backlogID,
            subject: "Author Info",
            level: 1,status: 200,action: "Fetch",
            created_at: new Date()
        });
        
        log.pushToFirebaseDb(log);
        log.save();
        setTimeout(() =>{fetchAuthorInfo(authorBacklogs,index);}, 200);
    }else{
        fetchAuthorInfo(authorBacklogs,index);
    }
};

fetchArticleInfo = (articleBacklogs,index) => {

    index++;
    backlog = articleBacklogs[index];
    backlog = new Backlog(backlog);

    if(backlog.status != "fetched"){
        
        backlog.crawl();
        Backlog.find({"backlogID" : backlog.backlogID}, function (err, docs) {
            docs[0].status = "fetched";
            docs[0].save();
        });

        var log = new Log({
            message: "Fetch" + backlog.backlogID,
            subject: "Article Info",
            level: 1,status: 200,action: "Fetch",
            created_at: new Date()
        });
        
        log.pushToFirebaseDb(log);
        log.save();

        setTimeout(() =>{fetchArticleInfo(articleBacklogs,index);}, 500);
    }else{
        fetchArticleInfo(articleBacklogs,index);
    }
};

module.exports = SA;