
var mongoose =    require('mongoose');
var request =     require('request');
var cheerio =     require('cheerio');

var Author =      require('./author.model');
var Article =     require('./article.model');
var Log =         require('./log.model');
var BacklogArchive =     require('./backlog_archive.model');

var chalk =       require('chalk');

var Schema = mongoose.Schema;

var ArticleBacklogSchema = new Schema({

    i: Number,
    st: String,
    res: Number
    
});


var ArticlBacklog = mongoose.model('ArticlBacklog', ArticleBacklogSchema);

module.exports = ArticlBacklog;