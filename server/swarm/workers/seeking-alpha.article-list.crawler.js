
const express =   require('express');

var Entrance =    require('../keepers/models/entrance.model');
var Backlog =     require('../keepers/models/backlog.model');
var Author =      require('../keepers/models/author.model');

const SA = express.Router();

var SITES_COLLECTION = "sites";
var BACKLOG_COLLECTION = "backlogs";

SA.get('/', function(req, res){

    Entrance.find({"name":"Quick Stock Picks & Lists"}, function(err, entrances) {
        if (err) throw err;
        console.log(entrances);
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

fetchAuthorInfo = (authorBacklogs,index) => {

    index++;
    backlog = authorBacklogs[index];
    backlog = new Backlog(backlog);

    if(backlog.status != "fetched"){
        console.log("calling backlog fetchauthorinfo method....");
        
        backlog.fetchAuthorInfo();
        Backlog.find({"backlogID" : backlog.backlogID}, function (err, docs) {
            console.log(docs);
            docs[0].status = "fetched";
            docs[0].save();
        });
        setTimeout(() =>{fetchAuthorInfo(authorBacklogs,index);}, 200);
    }else{
        fetchAuthorInfo(authorBacklogs,index);
    }
};


module.exports = SA;