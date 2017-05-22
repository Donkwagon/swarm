const express = require('express');
const SA_A_LIST = express.Router();

var SITES_COLLECTION = "sites";
var BACKLOG_COLLECTION = "backlogs";

var Entrance = require('../keepers/models/entrance.model');


SA_A_LIST.get('/', function(req, res){

    Entrance.find({}, function(err, entrances) {
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

module.exports = SA_A_LIST;