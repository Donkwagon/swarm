const express = require('express');
const SA_A_LIST = express.Router();

var SITES_COLLECTION = "sites";
var BACKLOG_COLLECTION = "backlogs";

var Entrance = require('../keepers/models/entrance.model');
var Backlog = require('../keepers/models/backlog.model');
var Author = require('../keepers/models/author.model');


SA_A_LIST.get('/', function(req, res){

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
})

SA_A_LIST.get('/author', function(req, res){

    Backlog.find({"type":"author"}, function(err, authorBacklogs) {
        if (err) throw err;
        index = 0;
        fetchAuthorInfo(authorBacklogs,index);
    });
})


fetchAuthorInfo = (authorBacklogs,index) => {

    index++;
    backlog = authorBacklogs[index];
    backlog = new Backlog(backlog);
    console.log(backlog);
    console.log(backlog.url);
    console.log(backlog.status);

    if(backlog.status != "fetched"){
        console.log("calling backlog fetchauthorinfo method....");
        
        backlog.fetchAuthorInfo();
        setTimeout(() =>{fetchAuthorInfo(authorBacklogs,index);}, 1000);
    }else{
        fetchAuthorInfo(authorBacklogs,index);
    }
}


module.exports = SA_A_LIST;