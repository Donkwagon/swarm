const express =   require('express');
var app =         express();

const queen = express.Router();

/////////////////////////////////////
//Keepers
const entrance =         require('./keepers/entrance.api');
const backlog =          require('./keepers/backlog.api');
const author =           require('./keepers/author.api');
const log =              require('./keepers/log.api');
const site =             require('./keepers/site.api');
const crawler =          require('./keepers/crawler.api');
const developer =        require('./keepers/developer.api');

queen.use('/log', log);
queen.use('/author', author);
queen.use('/backlog', backlog);
queen.use('/entrance', entrance);
queen.use('/site', site);
queen.use('/crawler', crawler);
queen.use('/developer', developer);


module.exports = queen;