const express =   require('express');
var app =         express();

const queen = express.Router();

/////////////////////////////////////
//Workers
const SA =         require('./workers/seeking-alpha.crawler');
const TEST =       require('./workers/seeking-alpha.backlogs.crawler');

queen.use('/SA', SA);
queen.use('/TEST', TEST);

/////////////////////////////////////
//Keepers
const entrance =   require('./keepers/entrance.api');
const backlog =    require('./keepers/backlog.api');
const author =     require('./keepers/author.api');
const log =        require('./keepers/log.api');
const site =        require('./keepers/site.api');
const crawler =        require('./keepers/crawler.api');

queen.use('/log', log);
queen.use('/author', author);
queen.use('/backlog', backlog);
queen.use('/entrance', entrance);
queen.use('/site', site);
queen.use('/crawler', crawler);


module.exports = queen;