
var mongoose =    require('mongoose');
var request =     require('request');
var cheerio =     require('cheerio');

var Author =      require('../content/author.model');
var Article =     require('../content/article.model');
var Log =         require('./log.model');
var BacklogArchive =     require('./backlog_archive.model');

var Schema = mongoose.Schema;

var ArticleBacklogSchema = new Schema({

    i: Number,
    st: String,
    res: Number,
    t: String
    
});


var ArticlBacklog = mongoose.model('ArticlBacklog', ArticleBacklogSchema);

module.exports = ArticlBacklog;