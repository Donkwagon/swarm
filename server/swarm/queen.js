const express = require('express');
var app = express();
const queen = express.Router();

/////////////////////////////////////
//Workers
const SA = require('./workers/seeking-alpha.crawler');
queen.use('/SA', SA);

const TEST = require('./workers/seeking-alpha.article-list.crawler');
queen.use('/TEST', TEST);

/////////////////////////////////////
//Keepers
const entrance = require('./keepers/entrance.api');
queen.use('/entrance', entrance);

const backlog = require('./keepers/backlog.api');
queen.use('/backlog', backlog);

const author = require('./keepers/author.api');
queen.use('/author', author);


module.exports = queen;